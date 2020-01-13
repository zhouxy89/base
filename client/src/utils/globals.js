import ulog from 'ulog';
const log = ulog('App');

/* The above line returns object having six different functions which you can use as logging.
    log.error('This logs an ERROR message')
    log.warn('This logs a WARN message')
    log.info('This logs an INFO message')
    log.log('This logs a LOG message')
    log.debug('This logs a DEBUG message')
    log.trace('This logs a TRACE message')
*/

export default log;
