import { logger } from '../../../helpers/logger';
import { requestLimiter } from '../../../helpers/rateLimiter';
import { BitcoinFeeType } from '../../../schemaTypes/query/data/bitcoinFee';
import { GraphQLBoolean } from 'graphql';
import fetch from 'node-fetch';

const url = 'https://bitcoinfees.earn.com/api/v1/fees/recommended';

export const getBitcoinFees = {
    type: BitcoinFeeType,
    args: {
        logger: { type: GraphQLBoolean },
    },
    resolve: async (root: any, params: any, context: any) => {
        await requestLimiter(context.ip, 'bitcoinFee');

        try {
            const response = await fetch(url);
            const json = await response.json();

            if (json) {
                const { fastestFee, halfHourFee, hourFee } = json;
                return {
                    fast: fastestFee,
                    halfHour: halfHourFee,
                    hour: hourFee,
                };
            } else {
                throw new Error('Problem getting Bitcoin fees.');
            }
        } catch (error) {
            params.logger &&
                logger.error('Error getting bitcoin fees: %o', error);
            throw new Error('Problem getting Bitcoin fees.');
        }
    },
};