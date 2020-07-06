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
    
  }
}

@Plugin()
export class LoggingPlugin implements ApolloServerPlugin{
    requestDidStart(): GraphQLRequestListener{
        return{
            didResolveOperation(){
                return Promise.resolve();
            },
            willSendResponse() {
                return Promise.resolve()
            },
        }
    }
}