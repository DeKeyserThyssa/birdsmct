"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeORMConfig = void 0;
exports.typeORMConfig = {
    type: 'mongodb',
    url: 'mongodb://localhost:27027/api',
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
};
//# sourceMappingURL=typeORMConfig.js.map