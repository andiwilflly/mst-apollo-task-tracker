import React from 'react';
// MobX
import { observable } from "mobx";
import {observer} from "mobx-react";


const fetchComponent = (WrappedComponent)=> {
    const Wrapper = class extends WrappedComponent {
        @observable isLoading = false;
    };
    return observer(Wrapper);
};

const fetchFunction = (target, key, descriptor) => {
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


export { fetchComponent, fetchFunction };