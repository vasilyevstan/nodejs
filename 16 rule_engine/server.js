const fastify = require('fastify');
const app = fastify();
const { Engine } = require('json-rules-engine');
let engine = new Engine();

engine.addRule({
    conditions: {
        all: [
            {
                fact: "temperature",
                operator: "equal",
                value: 100
            }
        ]
    },
    onSuccess() {
        console.log("Success")
    },
    onFailure() {
        console.log("Failure")
    },
    event: {
        type: "message",
        params: {
            data: "hello world"
        }
    }
});

const facts = { temperature: 300 };

engine.run(facts);

app.listen(3000);