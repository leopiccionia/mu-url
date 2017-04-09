# μURL
*How short can be an URL shortener?* The task never seemed too complex, but the right tools could make it even simpler. So I decided to make it as small as possible while still making it perfectly readable.

The original implementation requires seven characters after `/`, but allows the shortening of up to 2^42 (over 4 trillions!) URLs, so I think it's a good compromise. It presupposes that GETs are more common than SETs.

## How to use
If you have Node.js and npm installed, just run `npm install` and serve `index.js` on Node.

## TODO
* Avoid locking resources e.g. LevelDB while not in use;
* Better support for edge cases, like hash collisions (unlikely to occur).