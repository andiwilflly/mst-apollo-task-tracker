const isLoading = (target, key, descriptor) => {
    const original = descriptor.value;

    descriptor.value = async function(...args) {
        this.isLoading = true;
        try {
            const result = await original.apply(this, args);
            this.isLoading = false;
            return result;
        } catch (e) {
            console.log(`Error: ${e}`);
            throw e;
        }
    };
};


export default isLoading;