import { env } from '@/lib/env';

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogDetails {
  [key: string]: any;
}

/**
 * Application logger with environment-specific behavior
 */
class Logger {
  private isDevelopment: boolean;
  private isTest: boolean;
  
  constructor() {
    this.isDevelopment = env.NODE_ENV === 'development';
    this.isTest = env.NODE_ENV === 'test';
  }
  
  /**
   * Formats log details for output
   */
  private formatDetails(details?: LogDetails): string {
    if (!details) return '';
    try {
      return JSON.stringify(details, null, this.isDevelopment ? 2 : 0);
    } catch (e) {
      return '[Unserializable data]';
    }
  }
  
  /**
   * Sends log to error reporting service in production
   * Currently only logs to console as no external service is configured
   */
  private sendToErrorReporting(level: LogLevel, message: string, details?: LogDetails, error?: Error) {
    // Only send errors and warnings to error reporting in production
    if (env.NODE_ENV !== 'production' || (level !== 'error' && level !== 'warn')) {
      return;
    }
    
    // For now, just log to console in production
    console.info(`[${level.toUpperCase()}] Production log: ${message}`);
    
    // External error reporting can be added here in the future
  }
  
  /**
   * Log a debug message (only in development)
   */
  debug(message: string, details?: LogDetails) {
    if (this.isDevelopment || this.isTest) {
      console.debug(`[DEBUG] ${message}`, details ? this.formatDetails(details) : '');
    }
  }
  
  /**
   * Log an info message
   */
  info(message: string, details?: LogDetails) {
    console.info(`[INFO] ${message}`, details ? this.formatDetails(details) : '');
  }
  
  /**
   * Log a warning message
   */
  warn(message: string, details?: LogDetails, error?: Error) {
    console.warn(`[WARN] ${message}`, details ? this.formatDetails(details) : '', error || '');
    this.sendToErrorReporting('warn', message, details, error);
  }
  
  /**
   * Log an error message
   */
  error(message: string, details?: LogDetails, error?: Error) {
    console.error(`[ERROR] ${message}`, details ? this.formatDetails(details) : '', error || '');
    this.sendToErrorReporting('error', message, details, error);
  }
}

// Export a singleton instance
export const logger = new Logger(); 