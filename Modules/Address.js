// *** 構成 *** //
const Address = {

	// *** クライアント *** //
	client: {
		baseAddress: 0x01C57F54,
		offsets: [0x00000000, 0x0000005C, 0x00000000]
	},

	// *** アリーナ *** //
	arena: {
		baseAddress: 0x01C57F7C,
		offsets: [0x00000000, 0x0000005C, 0x00000004]
	},

	// *** 自分 *** //
	mine: {
		baseAddress: 0x01C57F7C,
		offsets: [0x00000000, 0x0000005C, 0x00000000, 0x00000034]
	},

	// *** プレイヤー *** //
	players: {
		baseAddress: 0x01C57BE8,
		offsets: [0x00000000, 0x0000005C, 0x00000000, 0x00000024]
	}

};

// *** モジュールのエクスポート *** //
module.exports = Address;
