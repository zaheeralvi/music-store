var supertest = require("supertest");
var should = require("should");

// This agent refers to PORT where program is runninng.

var server = supertest.agent("http://localhost:3000/api");

// UNIT test begin

describe("SAMPLE unit test", function () {

	it("should return register result", function (done) {

		server
			.post("/user")
			.set({ email: 'abc@xyz.com', password: 'password', username: 'test' })
			.expect("Content-type", /json/)
			.expect(200)
			.end(function (err, res) {

				res.status.should.equal(200);

				done();
			});
	});

	it("should return login result", function (done) {

		server
			.post("/user/login")
			.set({ email: 'abc@xyz.com', password: 'password' })
			.expect("Content-type", /json/)
			.expect(200)
			.end(function (err, res) {

				res.status.should.equal(200);

				done();
			});
	});

	it("should Add Album", function (done) {

		server
			.post("/album")
			.set({ artist: 'test', title: 'test', image: 'base64image', genre: 'pop', songs: ['song 1', 'song N'], price: 12 })
			.expect("Content-type", /json/)
			.expect(200)
			.end(function (err, res) {

				res.status.should.equal(200);

				done();
			});
	});

	it("should return albums", function (done) {

		server
			.get("/albums")
			.expect("Content-type", /json/)
			.expect(200)
			.end(function (err, res) {

				res.status.should.equal(200);

				done();
			});
	});

	it("should return album Details", function (done) {

		server
			.get("/album/5d6931a8f321613fbcc44949")
			.expect("Content-type", /json/)
			.expect(200)
			.end(function (err, res) {

				res.status.should.equal(200);

				done();
			});
	});

	it("should return Artist", function (done) {

		server
			.post("/artist/5d6931a8f321613fbcc44949")
			.expect("Content-type", /json/)
			.expect(200)
			.end(function (err, res) {

				if (res.status == 200) {
					res.status.should.equal(200);
				} else {
					res.status.should.equal(404);
				}

				done();
			});
	});

	it("should return Add to Cart", function (done) {

		server
			.post("/checkout")
			.set({ album: { album: 'Album Data' }, album_id: '5d6930394b389c319837fefc', user_id: 'test' })
			.expect("Content-type", /json/)
			.expect(200)
			.end(function (err, res) {

				res.status.should.equal(200);

				done();
			});
	});

	it("should return Place Order", function (done) {

		server
			.post("/checkout")
			.set({ album: { data: 'Album Data' }, user_id: '5d6930394b389c319837fefc', username: 'test' })
			.expect("Content-type", /json/)
			.expect(200)
			.end(function (err, res) {

				res.status.should.equal(200);

				done();
			});
	});

	it("should return get Activities", function (done) {

		server
			.get("/checkout")
			.expect("Content-type", /json/)
			.expect(200)
			.end(function (err, res) {

				res.status.should.equal(200);

				done();
			});
	});


});