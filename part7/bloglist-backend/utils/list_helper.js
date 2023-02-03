const totalLikes = (blogs) => {
	const numberOfLikes = blogs.reduce(
		(totalLikes, blog) => totalLikes + blog.likes,
		0
	)
	return numberOfLikes
}

const favoriteBlog = (blogs) => {
	const favorite = blogs
		.map(({ title, author, likes }) => ({ title, author, likes }))
		.reduce((totalLikes, blog) =>
			totalLikes.likes > blog.likes ? totalLikes : blog
		)
	return favorite
}

const mostBlogs = (blogs) => {
	const blogAuthorCounter = blogs.reduce((obj, blog) => {
		obj[blog.author] = obj[blog.author] ? obj[blog.author] + 1 : 1

		return obj
	}, {})

	return Object.entries(blogAuthorCounter).reduce((a, b) =>
		a.count > b.count ? a : b
	)
}

const getMostLikes = (blogs) =>
	blogs.reduce(
		({ sums, most }, { likes, author }) => {
			sums[author] = likes = (sums[author] || 0) + likes
			if (likes > most.likes) most = { author, likes }
			return { sums, most }
		},
		{ sums: {}, most: { likes: 0 } }
	).most


module.exports = {
	totalLikes,
	favoriteBlog,
	mostBlogs,
	getMostLikes
}