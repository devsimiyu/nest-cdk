import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from "aws-cdk-lib/aws-apigateway";
import path = require('path');
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class NestCdkIacStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'NestCdkIacQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });

    const gatewayFunc = new lambda.Function(this, 'GatewayFunc', {
      code: lambda.Code.fromAsset(path.join('../nest-cdk-api'), {
        bundling: {
          image: lambda.Runtime.NODEJS_18_X.bundlingImage,
          command: [
            'bash', '-c', [
              'npm ci',
              'rm -rf ./dist',
              'npx nest build',
              'cp -r ./node_modules /asset-output/node_modules',
              'cp -r ./dist /asset-output/dist',
              'rm -rf ./npm-cache'
            ].join(' && ')
          ],
        },
      }),
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'dist/main.handler',
    });

    const gatewayApi = new apigateway.RestApi(this, "ApiGateway", {
      restApiName: "API Service",
      description: "REST API for the app entrypoint"
    });

    gatewayApi.root.addMethod("GET", new apigateway.LambdaIntegration(gatewayFunc));
  }
}
