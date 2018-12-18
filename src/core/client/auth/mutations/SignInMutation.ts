import { Environment } from "relay-runtime";

import { sendAuthError, sendAuthToken } from "talk-auth/helpers";
import { TalkContext } from "talk-framework/lib/bootstrap";
import { createMutationContainer } from "talk-framework/lib/relay";
import { signIn, SignInInput } from "talk-framework/rest";

export type SignInMutation = (input: SignInInput) => Promise<void>;

export async function commit(
  environment: Environment,
  input: SignInInput,
  { rest, postMessage }: TalkContext
) {
  try {
    const result = await signIn(rest, input);
    sendAuthToken(postMessage, result.token);
    window.close();
  } catch (err) {
    sendAuthError(postMessage, err.toString());
    throw err;
  }
}

export const withSignInMutation = createMutationContainer("signIn", commit);
