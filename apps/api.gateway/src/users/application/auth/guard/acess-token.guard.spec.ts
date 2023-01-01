import { ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Test } from '@nestjs/testing';
import { mock } from 'jest-mock-extended';
import { IDataService } from '../../interface/spi/idata.service';

import { AccessTokenGuard } from './access-token.guard';

const payload = { id: '1' };

describe('AccessTokenGuard', () => {
  let context: ExecutionContext;
  let jwtAuthGuard: AccessTokenGuard;
  let gqlExecutionContext;
  const mockDataService = mock<IDataService>();

  beforeEach(async () => {
    context = mock<ExecutionContext>();

    const module = await Test.createTestingModule({
      providers: [
        AccessTokenGuard,
        GqlExecutionContext,
        { provide: IDataService, useValue: mockDataService },
      ],
    }).compile();

    jwtAuthGuard = module.get<AccessTokenGuard>(AccessTokenGuard);
    gqlExecutionContext = module.get<GqlExecutionContext>(GqlExecutionContext);
  });

  it('should be defined', () => {
    expect(jwtAuthGuard).toBeDefined();
  });

  it('should return when pass payload', async () => {
    const expected = {
      body: payload,
    };
    const spyGqlCreate = jest.spyOn(GqlExecutionContext, 'create');
    spyGqlCreate.mockImplementation(() => ({
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      getContext: function () {
        return {
          req: expected,
        };
      },
      getArgs: jest.fn(),
    }));

    const actual = await jwtAuthGuard.getRequest(context);
    expect(actual).toEqual(expected);
  });
});
