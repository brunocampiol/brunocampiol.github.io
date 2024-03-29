function drawWorld(world, context) {
    for (var j = world.m_jointList; j; j = j.m_next) {
        drawJoint(j, context);
    }
    for (var b = world.m_bodyList; b; b = b.m_next) {
        for (var s = b.GetShapeList(); s != null; s = s.GetNext()) {
            drawShape(s, context);
        }
    }
}

function drawJoint(joint, context) {
    var b1 = joint.m_body1;
    var b2 = joint.m_body2;
    var x1 = b1.m_position;
    var x2 = b2.m_position;
    var p1 = joint.GetAnchor1();
    var p2 = joint.GetAnchor2();
    context.strokeStyle = '#00eeee';
    context.beginPath();
    switch (joint.m_type) {
        case b2Joint.e_distanceJoint:
            context.moveTo(p1.x, p1.y);
            context.lineTo(p2.x, p2.y);
            break;

        case b2Joint.e_pulleyJoint:
            // TODO
            break;

        default:
            if (b1 == world.m_groundBody) {
                context.moveTo(p1.x, p1.y);
                context.lineTo(x2.x, x2.y);
            }
            else if (b2 == world.m_groundBody) {
                context.moveTo(p1.x, p1.y);
                context.lineTo(x1.x, x1.y);
            }
            else {
                context.moveTo(x1.x, x1.y);
                context.lineTo(p1.x, p1.y);
                context.lineTo(x2.x, x2.y);
                context.lineTo(p2.x, p2.y);
            }
            break;
    }
    context.stroke();
}

function drawShape(shape, context) {
    context.strokeStyle = '#ffffff';
    context.beginPath();
    switch (shape.m_type) {
        case b2Shape.e_circleShape:
            {
                var circle = shape;
                var pos = circle.m_position;
                var r = circle.m_radius;
                var segments = 16.0;
                var theta = 0.0;
                var dtheta = 2.0 * Math.PI / segments;
                // draw circle
                context.moveTo(pos.x + r, pos.y);
                for (var i = 0; i < segments; i++) {
                    var d = new b2Vec2(r * Math.cos(theta), r * Math.sin(theta));
                    var v = b2Math.AddVV(pos, d);
                    context.lineTo(v.x, v.y);
                    theta += dtheta;
                }
                context.lineTo(pos.x + r, pos.y);

                // draw radius
                context.moveTo(pos.x, pos.y);
                var ax = circle.m_R.col1;
                var pos2 = new b2Vec2(pos.x + r * ax.x, pos.y + r * ax.y);
                context.lineTo(pos2.x, pos2.y);
            }
            break;
        case b2Shape.e_polyShape:
            {
                var poly = shape;
                var tV = b2Math.AddVV(poly.m_position, b2Math.b2MulMV(poly.m_R, poly.m_vertices[0]));
                context.moveTo(tV.x, tV.y);
                for (var i = 0; i < poly.m_vertexCount; i++) {
                    var v = b2Math.AddVV(poly.m_position, b2Math.b2MulMV(poly.m_R, poly.m_vertices[i]));
                    context.lineTo(v.x, v.y);
                }
                context.lineTo(tV.x, tV.y);
            }
            break;
    }
    context.stroke();
}

// Defines the world base
// Loads ground and walls

function createWorld() {
    var worldAABB = new b2AABB();
    worldAABB.minVertex.Set(-1000, -1000);
    worldAABB.maxVertex.Set(1000, 1000);
    var gravity = new b2Vec2(0, 100);
    var doSleep = true;
    var world = new b2World(worldAABB, gravity, doSleep);
    // set up the ground
    createGround(world);
    // creates the lateral walls
    createBox(world, 0, 500, 10, 500);
    createBox(world, 800, 500, 10, 500);
    return world;
}

function createGround(world) {
    var groundSd = new b2BoxDef();
    groundSd.extents.Set(100000, 10);
    groundSd.restitution = 0.2;
    var groundBd = new b2BodyDef();
    groundBd.AddShape(groundSd);
    groundBd.position.Set(-500, 500);
    return world.CreateBody(groundBd)
}

// Functions that creates the left click create
function createBall(world, x, y, radius, restitution, friction) {
    var ballSd = new b2CircleDef();
    ballSd.density = 1.0;
    ballSd.radius = radius;
    //ballSd.radius = 20;
    ballSd.restitution = restitution;
    //ballSd.restitution = 0.2; 	
    ballSd.friction = friction;
    //ballSd.friction = 0.2;
    var ballBd = new b2BodyDef();
    ballBd.AddShape(ballSd);
    ballBd.position.Set(x, y);
    return world.CreateBody(ballBd);
}

function createTriangle(world, x, y, size, fixed) {
    // Equilateral triangle vertice formula
    //A = (x + sqrt(3) * s / 2, y - s / 2)
    //B = (x - sqrt(3) * s / 2, y - s / 2)
    //C = (x, y + s)
    var polySd = new b2PolyDef();
    var points = [[0, 0], [size, size], [-size, size]];
    if (typeof (fixed) == 'undefined') fixed = true;
    if (!fixed) polySd.density = 1.0;
    polySd.vertexCount = points.length;
    for (var i = 0; i < points.length; i++) {
        polySd.vertices[i].Set(points[i][0], points[i][1]);
    }
    var polyBd = new b2BodyDef();
    polyBd.AddShape(polySd);
    polyBd.position.Set(x, y);
    return world.CreateBody(polyBd)
}

function createBox(world, x, y, width, height, fixed) {
    if (typeof (fixed) == 'undefined') fixed = true;
    var boxSd = new b2BoxDef();
    if (!fixed) boxSd.density = 1.0;
    boxSd.extents.Set(width, height);
    var boxBd = new b2BodyDef();
    boxBd.AddShape(boxSd);
    boxBd.position.Set(x, y);
    return world.CreateBody(boxBd)
}

var demos = {};
demos.InitWorlds = [];
