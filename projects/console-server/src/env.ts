// export class Env {
//   @IsIn(['UTC'])
//   TZ!: string;

//   @IsIn(NodeEnvType)
//   NODE_ENV!: NodeEnvType;

//   @IsIn(RunType)
//   CLIENT_ADMIN_RUN_TYPE!: RunType;

//   @IsBoolean()
//   @TransformBooleanString()
//   CLIENT_ADMIN_RDS_SSL_CONNECTION!: boolean;

//   @IsFilledString()
//   CLIENT_ADMIN_RDS_HOST!: string;

//   @IsNumber()
//   @Type(() => Number)
//   CLIENT_ADMIN_RDS_PORT!: number;

//   @IsFilledString()
//   CLIENT_ADMIN_RDS_USERNAME!: string;

//   @IsFilledString()
//   CLIENT_ADMIN_RDS_PASSWORD!: string;

//   @IsFilledString()
//   CLIENT_ADMIN_RDS_SCHEMA!: string;

//   @IsFilledString()
//   CLIENT_ADMIN_API_TOKEN!: string;
// }

// export const env = loadEnvLazySync(Env, { printable: logger });
