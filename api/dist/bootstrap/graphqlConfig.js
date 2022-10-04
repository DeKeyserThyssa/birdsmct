"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.graphqlConfig = void 0;
const apollo_1 = require("@nestjs/apollo");
exports.graphqlConfig = {
    driver: apollo_1.ApolloDriver,
    sortSchema: true,
    autoSchemaFile: true,
};
//# sourceMappingURL=graphqlConfig.js.map