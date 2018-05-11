const permissions = (Component, b,c)=> {
	Component.permissions = {
		needAuth: false,
		notForAuth: false,
		redirectPath: '/login',
		...Component.permissions
	};

	return Component;
};


export default permissions;