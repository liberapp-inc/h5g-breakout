
const BOXES_IN_WIDTH = 5;
const BOX_SIZE_PER_WIDTH = 1/BOXES_IN_WIDTH;
const PADDLE_SIZE_PER_WIDTH = 1 / 4;
const BALL_SIZE_PER_WIDTH = PADDLE_SIZE_PER_WIDTH / 4;

class Game {

    static loadSceneGamePlay() {
        new Background();
        new Paddle();
        new Score();
    }
}
