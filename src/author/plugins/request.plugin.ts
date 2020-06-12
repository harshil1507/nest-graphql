import { Plugin } from '@nestjs/graphql';
import {
  ApolloServerPlugin,
  GraphQLRequestListener,
  GraphQLServiceContext
} from 'apollo-server-plugin-base';

@Plugin()
export class ServerStartPlugin implements ApolloServerPlugin{
  serverWillStart(service: GraphQLServiceContext ){
    console.log('Server started');
    return Promise.resolve();
    // return {
    //   willSendResponse() {
    //     console.log('Will send response');
    //   },
    // };
  }
}

@Plugin()
export class LoggingPlugin implements ApolloServerPlugin{
    requestDidStart(): GraphQLRequestListener{
        return{
            didResolveOperation(){
                //console.log(arguments, typeof arguments)
                console.log('operation resolved');
                return Promise.resolve();
            },
            willSendResponse() {
                console.log('Will send response');
                return Promise.resolve()
            },
        }
    }
}