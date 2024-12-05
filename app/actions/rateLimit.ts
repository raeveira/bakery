export class RateLimit {
    private static rateLimit: number = 50;
    private static rateLimitInterval: number = 60 * 1000; // 60 seconds in milliseconds
    private static rateLimitCount: number = 0;
    private static rateLimitStart: number = Date.now();

    public static async checkRateLimit(): Promise<boolean> {
        const currentTime = Date.now();

        // Reset rate limit if the interval has passed
        if (currentTime > this.rateLimitStart + this.rateLimitInterval) {
            this.rateLimitCount = 0;
            this.rateLimitStart = currentTime;
        }

        // Check rate limit
        if (this.rateLimitCount >= this.rateLimit) {
            const waitTime = this.rateLimitStart + this.rateLimitInterval - currentTime;
            throw new Error(`Rate limit exceeded. Please try again in ${Math.ceil(waitTime / 1000)} seconds.`);
        }

        // Increment the rate limit count
        this.rateLimitCount++;
        return true;
    }

    public static getRemainingRequests(): number {
        return Math.max(0, this.rateLimit - this.rateLimitCount);
    }

    public static getResetTime(): number {
        return this.rateLimitStart + this.rateLimitInterval;
    }
}
