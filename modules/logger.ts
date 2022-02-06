import * as path from "path";
import { createLogger, format, Logger, transports } from "winston";
import * as winstonDaily from "winston-daily-rotate-file";

const logDirBase = "./server_logs";
const logFormat = format.printf(
    (info) =>
        `[${info.level}](${info.label}) ${info.timestamp} > ${info.message}`
);

function CreateLogger(label: string, console: boolean = true): Logger {
    const logDir = path.join(logDirBase, label);
    const logger = createLogger({
        format: format.combine(
            format.label({
                label: label,
            }),
            format.timestamp({
                format: "YYYY-MM-DD HH:mm:ss",
            }),
            logFormat
        ),
        transports: [
            new winstonDaily({
                level: "info",
                datePattern: "YYYY-MM-DD",
                dirname: logDir,
                filename: `%DATE%.log`,
                maxFiles: 10, // 10일치
                zippedArchive: true,
            }),
            new winstonDaily({
                level: "error",
                datePattern: "YYYY-MM-DD",
                dirname: logDir + "/error",
                filename: `%DATE%.error.log`,
                maxFiles: 10,
                zippedArchive: true,
            }),
        ],
    });

    if (console) {
        logger.add(
            new transports.Console({
                level: "debug",
                format: format.combine(
                    format.label({
                        label: label,
                    }),
                    format.colorize(),
                    format.timestamp({
                        format: "YYYY-MM-DD HH:mm:ss",
                    }),
                    format.printf(
                        (info) =>
                            `[${info.level}] ${info.label} > ${info.message}`
                    )
                ),
            })
        );
    }

    return logger;
}

/*
 * Log Level
 * error: 0, warn: 1, info: 2, http: 3, verbose: 4, debug: 5, silly: 6
 */
const logger = CreateLogger("GLOBAL", true);

export { CreateLogger, logger };
