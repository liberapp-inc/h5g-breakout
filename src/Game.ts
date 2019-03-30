// Liberapp 2019 - Tahiti Katagai
// ゲーム全般

const BOXES_IN_WIDTH = 6;
const BOX_SIZE_PER_WIDTH = 1/BOXES_IN_WIDTH;
const PADDLE_SIZE_PER_WIDTH = 1 / 4;
const BALL_SIZE_PER_WIDTH = PADDLE_SIZE_PER_WIDTH / 4;

class Game {

    static loadSceneGamePlay() {
        new Background();
        new Paddle();
        new Score();
        new StartMessage();
    }
}
