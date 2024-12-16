export function generate2FACode(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
}
export function send2FACode(code: string, email: string): void {
    console.log(`2FA Code for ${email}: ${code}`);
    // TODO: Integrate email service to send the code
}
export function verify2FACode(inputCode: string, actualCode: string): boolean {
    return inputCode === actualCode;
}

export async function handle2FA(email: string, inputCode: string, actualCode: string) {
    if (verify2FACode(inputCode, actualCode)) {
        console.log("2FA verification successful. Access granted.");
        return { success: true };
        // TODO: Proceed with login or other actions
    } else {
        console.log("2FA verification failed. Access denied.");
        return { success: false };
        // TODO: Deny access and handle accordingly
    }
}