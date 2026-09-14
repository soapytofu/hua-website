import { Redis } from "@upstash/redis";

export interface EmbedLink {
  embedUrl: string;
  externalUrl: string;
}

export interface ResourcesConfig {
  receiptInstructions: EmbedLink;
  grantApplicationInstructions: EmbedLink;
  exampleApplicationUrl: string;
  hfcuAccountSetup: string;
  hfcuSignerChange: string;
  returnFunds: string;
}

const DEFAULT_HFCU_ACCOUNT_SETUP = `*All instructions below can be found on the HFCU website.*

**To open a new account, students must:**

1. **Have authorization from the school's Student Organization Office** to open a new account. This can be done by submitting the HFCU Approval form on SOCO (click on the HFCU icon). Your school's office will need to email studentorgs@harvardfcu.org to provide authorization of your new account opening. Please allow 5 business days after your school notifies HFCU before following the steps below — HFCU will be unable to open a new account without your school's authorization.
2. **Upload the following documents:**
   - New Organization Account Form
   - Authorized Signer Form
   - IRS letter with your Taxpayer Identification Number (TIN/EIN) for your organization (HBS and HLS may skip this step)
   - Copy of your Harvard ID and government-issued ID (U.S. driver's license or passport)
3. **Complete the next steps in the email.** Students will receive a next-steps email from Harvard FCU within five business days of completing Step 2. The email will include online banking instructions.`;

const DEFAULT_HFCU_SIGNER_CHANGE = `*All instructions below can be found on the HFCU website.*

1. **First step:** Harvard undergraduate students submit an account signer change request form on SOCO (click on the HFCU icon).
2. **Second step:** Authorized signers (as determined by your school) will need to complete and upload the following:
   - Authorized Signer Form
   - Copy of your Harvard ID and government-issued ID (U.S. driver's license or passport)

Please allow up to five business days after your school has notified HFCU that you are an authorized signer for processing. Only students authorized by their school will be added to the account.`;

const DEFAULT_RETURN_FUNDS = `_This section hasn't been filled in yet — add instructions for returning unused grant funds in the admin panel._`;

export const DEFAULT_RESOURCES: ResourcesConfig = {
  receiptInstructions: { embedUrl: "", externalUrl: "" },
  grantApplicationInstructions: { embedUrl: "", externalUrl: "" },
  exampleApplicationUrl: "",
  hfcuAccountSetup: DEFAULT_HFCU_ACCOUNT_SETUP,
  hfcuSignerChange: DEFAULT_HFCU_SIGNER_CHANGE,
  returnFunds: DEFAULT_RETURN_FUNDS,
};

const RESOURCES_KEY = "resources_config";

function getRedis() {
  const url =
    process.env.UPSTASH_REDIS_REST_URL ||
    process.env.STORAGE_REDIS_REST_URL ||
    process.env.KV_REST_API_URL;
  const token =
    process.env.UPSTASH_REDIS_REST_TOKEN ||
    process.env.STORAGE_REDIS_REST_TOKEN ||
    process.env.KV_REST_API_TOKEN;
  if (!url || !token) return null;
  return new Redis({ url, token });
}

export async function getResourcesConfig(): Promise<ResourcesConfig> {
  try {
    const redis = getRedis();
    if (!redis) return DEFAULT_RESOURCES;
    const data = await redis.get<Partial<ResourcesConfig>>(RESOURCES_KEY);
    if (!data) return DEFAULT_RESOURCES;
    return {
      ...DEFAULT_RESOURCES,
      ...data,
      receiptInstructions: { ...DEFAULT_RESOURCES.receiptInstructions, ...data.receiptInstructions },
      grantApplicationInstructions: { ...DEFAULT_RESOURCES.grantApplicationInstructions, ...data.grantApplicationInstructions },
    };
  } catch {
    return DEFAULT_RESOURCES;
  }
}

export async function setResourcesConfig(config: ResourcesConfig): Promise<void> {
  const redis = getRedis();
  if (!redis) throw new Error("Redis not configured");
  await redis.set(RESOURCES_KEY, config);
}
