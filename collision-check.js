function isCollision({
    object1,
    object2
}) {
    return (
        // bottom of the player
        object1.position.y + object1.height >= object2.position.y

        // from bottom up
        && object1.position.y <= object2.position.y + object2.height

        // from the left
        && object1.position.x <= object2.position.x + object2.width

        // from the right
        && object1.position.x + object1.width >= object2.position.x
    )
}