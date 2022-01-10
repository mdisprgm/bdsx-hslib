export function Sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

/*Example
(async () => {
    // code
    await sleep(1000); // 1sec
    // code
})();
 */
