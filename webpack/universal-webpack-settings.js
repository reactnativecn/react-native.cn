module.exports =
{
	server:
	{
		input: './src',
		output: './build/server/index.js'
	},
	exclude_from_externals:
	[
		/\.css$/,
	],
};
