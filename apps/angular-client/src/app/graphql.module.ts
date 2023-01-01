import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ApolloLink, InMemoryCache } from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';
import { Apollo, ApolloModule } from 'apollo-angular';
import { HttpLinkModule } from 'apollo-angular-link-http';
import { HttpLink } from 'apollo-angular/http';

@NgModule({
  exports: [HttpClientModule, ApolloModule, HttpLinkModule],
})
export class GraphQLModule {
  uri = 'http://localhost:5000/graphql';
  authUri = 'http://localhost:3333/graphql';

  constructor(apollo: Apollo, httpLink: HttpLink) {
    // create Apollo
    const basic = setContext((operation, context) => ({
      headers: {
        Accept: 'charset=utf-8',
      },
    }));

    const auth = setContext((operation, context) => {
      const token = localStorage.getItem('token');
      console.log(
        '🚀 ~ file: graphql.module.ts:26 ~ GraphQLModule ~ auth ~ token',
        token
      );

      if (token === null) {
        return {};
      } else {
        return {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      }
    });

    const mockdb: any = { uri: this.uri };
    apollo.createDefault({
      link: ApolloLink.from([basic, auth, httpLink.create(mockdb)]),
      // link: httpLink.create(mockdb),
      cache: new InMemoryCache(),
    });

    const authserver: any = { uri: this.authUri };
    apollo.createNamed('authserver', {
      link: ApolloLink.from([basic, auth, httpLink.create(authserver)]),
      // link: httpLink.create(authserver),
      cache: new InMemoryCache(),
    });
    // apollo.create({
    //   link: httpLink.create({ uri }),
    //   cache: new InMemoryCache(),
    // });
  }
}
