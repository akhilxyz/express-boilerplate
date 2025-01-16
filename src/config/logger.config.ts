export class LoggerConfig {
    constructor(
      public readonly level : any
    ) {}
  
    static create(): LoggerConfig {
      return new LoggerConfig(
        process.env.LOG_LEVEL || 'info'
      );
    }
  }