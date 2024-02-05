"use strict"


function detectCollisions(){
    let obj1;
    let obj2;

    if (game == "exam" || game == "base") {
        if (wallCollision(thePaddle.x, thePaddle.y, thePaddle.width, thePaddle.height) == 0 && thePaddle.vfx <= 0) {
            thePaddle.x = 2
        } else if (wallCollision(thePaddle.x, thePaddle.y, thePaddle.width, thePaddle.height) == 1 && thePaddle.vfx >= 0) {
            thePaddle.x = canvas.width - thePaddle.width - 2
        }
    }


    if (gameOver) {
        if (wallCollision(big.x, big.y, big.width, big.height) == 0) {
            big.x = 3
            big.vx *= -1
        } else if (wallCollision(big.x, big.y, big.width, big.height) == 1) {
            big.x = canvas.width - big.width - 3
            big.vx *= -1
        } else if (wallCollision(big.x, big.y, big.width, big.height) == 2) {
            big.y = 3
            big.vy *= -1
        }
        


            if (rectIntersect(big.x, big.y, big.width, big.height, thePaddle.x, thePaddle.y, thePaddle.width, thePaddle.height)) {
                let vCollision = {x: thePaddle.cx - big.cx, y: thePaddle.cy - big.cy};
                let angle = Math.atan(Math.abs(vCollision.y / vCollision.x)) * 180 / Math.PI
                let vRelativeVelocity = {x: big.vx - thePaddle.vfx, y: big.vy};
                let velocity = Math.sqrt((vRelativeVelocity.x)**2 + (vRelativeVelocity.y)**2);
                let relVel = {x: vRelativeVelocity.x / velocity, y: vRelativeVelocity.y / velocity}
                let speed = vRelativeVelocity.x * relVel.x + vRelativeVelocity.y * relVel.y;
                if (angle > thePaddle.angle) {
                    big.vy *= -1
                } else if (angle < thePaddle.angle) {
                    big.vx -= (2 * speed * relVel.x)
                    big.vy *= 1           
                } else {
                    big.vx *= -1
                    big.vy *= -1
                }
            }
    }

    // Start checking for collisions
    for (let i = 0; i < gameObjects.length; i++)
    {
        obj1 = gameObjects[i];

        if (wallCollision(obj1.x, obj1.y, obj1.width, obj1.height) == 0) {
            obj1.x = 3
            obj1.vx *= -1
        } else if (wallCollision(obj1.x, obj1.y, obj1.width, obj1.height) == 1) {
            obj1.x = canvas.width - obj1.width - 3
            obj1.vx *= -1
        } else if (wallCollision(obj1.x, obj1.y, obj1.width, obj1.height) == 2) {
            obj1.y = 3
            obj1.vy *= -1
        }
        if ((game == "zen" || game == "home") && wallCollision(obj1.x, obj1.y, obj1.width, obj1.height) == 3) {
            obj1.y = canvas.height - obj1.height - 3
            obj1.vy *= -1
        }

        if (game == "exam" || game == "base") {

            if (rectIntersect(obj1.x, obj1.y, obj1.width, obj1.height, thePaddle.x, thePaddle.y, thePaddle.width, thePaddle.height)) {
                if (game == "base") {
                    paddlePoint(i)
                } else if (game == "exam") {
                    changePoint()
                }

                let giveBonus = -1
                let boost = 1
                if (Math.random() <= 0.2) {
                    giveBonus = -1.5
                    boost = -1
                }
                let vCollision = {x: thePaddle.cx - obj1.cx, y: thePaddle.cy - obj1.cy};
                let angle = Math.atan(Math.abs(vCollision.y / vCollision.x)) * 180 / Math.PI
                let vRelativeVelocity = {x: obj1.vx - thePaddle.vfx, y: obj1.vy};
                let velocity = Math.sqrt((vRelativeVelocity.x)**2 + (vRelativeVelocity.y)**2);
                let relVel = {x: vRelativeVelocity.x / velocity, y: vRelativeVelocity.y / velocity}
                let speed = vRelativeVelocity.x * relVel.x + vRelativeVelocity.y * relVel.y;
                if (angle > thePaddle.angle) {
                    obj1.vy *= giveBonus
                } else if (angle < thePaddle.angle) {
                    obj1.vx -= (2 * speed * relVel.x)
                    obj1.vy *= boost            
                } else {
                    obj1.vx *= giveBonus
                    obj1.vy *= giveBonus
                }
                obj1.update(secondsPassed)
            }
        }

        for (let j = i + 1; j < gameObjects.length; j++)
        {
            obj2 = gameObjects[j];

            // Compare object1 with object2
            if (rectIntersect(obj1.x, obj1.y, obj1.width, obj1.height, obj2.x, obj2.y, obj2.width, obj2.height)){
                let giveBonus = 1
                if (Math.random() <= 0.1) {
                    giveBonus = 1.5
                }

                let vCollision = {x: obj2.cx - obj1.cx, y: obj2.cy - obj1.cy};
                let distance = Math.sqrt((obj2.cx-obj1.cx)**2 + (obj2.cy-obj1.cy)**2);
                let vCollisionNorm = {x: vCollision.x / distance, y: vCollision.y / distance};

                let vRelativeVelocity = {x: obj1.vx - obj2.vx, y: obj1.vy - obj2.vy};
                let velocity = Math.sqrt((vRelativeVelocity.x)**2 + (vRelativeVelocity.y)**2);
                let relVel = {x: vRelativeVelocity.x / velocity, y: vRelativeVelocity.y / velocity}

                let average = {x: (relVel.x + vCollisionNorm.x) / 2, y: (relVel.y + vCollisionNorm.y) / 2}
                let speed = vRelativeVelocity.x * average.x + vRelativeVelocity.y * average.y;

                let impulse = 2 * speed / (obj1.mass + obj2.mass);

                obj1.vx -= (impulse * obj2.mass * average.x);
                obj1.vy -= (impulse * obj2.mass * average.y);
                obj2.vx += (impulse * obj1.mass * average.x);
                obj2.vy += (impulse * obj1.mass * average.y);

                obj1.vx *= giveBonus
                obj1.vy *= giveBonus

            }
        }
    }
}


function rectIntersect(x1, y1, w1, h1, x2, y2, w2, h2) {
    // Check x and y for overlap
    if (x1 + w1 >= x2 && x1 <= x2 + w2 && y1 + h1 >= y2 && y1 <= y2 + h2){
        return true;
    }
    return false;
}


function wallCollision(x, y, w, h) {
    if (x <= 2) {
        return 0
    } else if (x + w >= canvas.width - 2) {
        return 1
    } else if (y <= 2) {
        return 2
    } else if (y + h >= canvas.height - 2) {
        return 3
    }
}