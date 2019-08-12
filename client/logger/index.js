import DevLogger from './logger-dev';
import ProdLogger from './logger-prod';

var Logger;

if (process.env.NODE_ENV == "production") {
    Logger = ProdLogger;
} else {
    Logger = DevLogger;
}

export default Logger;