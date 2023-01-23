import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as sns from 'aws-cdk-lib/aws-sns';
import * as subscriptions from 'aws-cdk-lib/aws-sns-subscriptions';
import path = require('path');
import * as sqs from 'aws-cdk-lib/aws-sqs';
import { SqsEventSource } from 'aws-cdk-lib/aws-lambda-event-sources';

export class NestCdkIacStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Gateway Lambda & SNS

    const gatewayTopic = new sns.Topic(this, 'GatewayTopic', {
      topicName: 'GatewayTopic'
    });
    const gatewayFunc = new lambda.Function(this, 'GatewayFunc', {
      code: lambda.Code.fromAsset(path.join('../nest-cdk-api'), {
        bundling: {
          image: lambda.Runtime.NODEJS_18_X.bundlingImage,
          command: ['bash', '-c', 'sh bundle.sh "gateway"'],
        },
      }),
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'dist/apps/gateway/main.handler',
      environment: {
        'TOPIC_ARN': gatewayTopic.topicArn,
        'AWS_REGION': process.env['AWS_REGION']!
      }
    });
    const gatewayFuncSnsPublishPolicy = new iam.PolicyStatement({
      actions: ['sns:publish'],
      resources: [gatewayTopic.topicArn],
    });

    gatewayFunc.addToRolePolicy(gatewayFuncSnsPublishPolicy);

    // API Gateway

    const gatewayApi = new apigateway.RestApi(this, 'ApiGateway', {
      restApiName: 'API Service',
      description: 'REST API for the app entrypoint'
    });

    gatewayApi.root.addMethod('GET', new apigateway.LambdaIntegration(gatewayFunc));

    // Webhook SQS & Lambda

    const wehbookSqs = new sqs.Queue(this, 'WebhookQueue', {
      visibilityTimeout: cdk.Duration.seconds(300)
    });
    const webhookFunc = new lambda.Function(this, 'GatewayFunc', {
      code: lambda.Code.fromAsset(path.join('../nest-cdk-api'), {
        bundling: {
          image: lambda.Runtime.NODEJS_18_X.bundlingImage,
          command: ['bash', '-c', 'sh bundle.sh "webhook"'],
        },
      }),
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'dist/apps/webhook/main.handler'
    });

    gatewayTopic.addSubscription(new subscriptions.SqsSubscription(wehbookSqs));
    webhookFunc.addEventSource(new SqsEventSource(wehbookSqs));
  }
}
