/////// MAIN ///////
// ETH MAIN
export const ethMainProvider = () => {
	return [
		[
			process.env.ETH_MAIN_ENDPOINT_ANKR_0000
		],
    [
      process.env.ETH_MAIN_ENDPOINT_ANKR_0001
    ],
    [
      process.env.ETH_MAIN_ENDPOINT_ANKR_0002
    ],
    [
      process.env.ETH_MAIN_ENDPOINT_ANKR_0006
    ],
    [
      process.env.ETH_MAIN_ENDPOINT_ANKR_0007
    ]
	];
};

// BSC MAIN
export const bscMainProvider = () => {
	return [
		[
			process.env.BSC_MAIN_ENDPOINT_ANKR_0000,
      process.env.BSC_MAIN_ENDPOINT_NODEREAL_OFFICIAL
		],
    [
      process.env.BSC_MAIN_ENDPOINT_ANKR_0001
    ],
    [
      process.env.BSC_MAIN_ENDPOINT_ANKR_0002
    ],
    [
      process.env.BSC_MAIN_ENDPOINT_ANKR_0006
    ],
    [
      process.env.BSC_MAIN_ENDPOINT_ANKR_0007
    ]
	];
};

// POL MAIN
export const polMainProvider = () => {
	return [
    [
			process.env.POL_MAIN_ENDPOINT_ANKR_0000
		],
    [
      process.env.POL_MAIN_ENDPOINT_ANKR_0001
    ],
    [
      process.env.POL_MAIN_ENDPOINT_ANKR_0002
    ],
    [
      process.env.POL_MAIN_ENDPOINT_ANKR_0006
    ],
    [
      process.env.POL_MAIN_ENDPOINT_ANKR_0007
    ]
	];
};

/////// TEST ///////
// RINK TEST
export const ethRinkProvider = () => {
	return [
		[
      process.env.ETH_RIKN_ENDPOINT_ANKR_0000
    ],
    [
      process.env.ETH_RIKN_ENDPOINT_ANKR_0001
    ],
    [
      process.env.ETH_RIKN_ENDPOINT_ANKR_0002
    ]
	];
};

// BSC TEST
export const bscTestProvider = () => {
	return [
		[
      process.env.BSC_TEST_ENDPOINT_ANKR_0000
    ],
    [
      process.env.BSC_TEST_ENDPOINT_ANKR_0001
    ],
    [
      process.env.BSC_TEST_ENDPOINT_ANKR_0002
    ]
	];
};

// POL TEST
export const polTestProvider = () => {
	return [
		[
      process.env.POL_TEST_ENDPOINT_ANKR_0003
    ],
    [
      process.env.POL_TEST_ENDPOINT_ANKR_0004
    ],
    [
      process.env.POL_TEST_ENDPOINT_ANKR_0005
    ]
	];
};
