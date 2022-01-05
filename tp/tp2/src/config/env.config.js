let CONFIG = {};
CONFIG.node_env = process.env.NODE_ENV;
CONFIG.root_api = process.env.ROOT_API;
CONFIG.port = process.env.PORT;

CONFIG.format_logs= process.env.FORMAT_LOGS;

module.exports = CONFIG;