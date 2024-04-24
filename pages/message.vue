<template>
    <div class="bg-gray-900 h-screen w-full flex justify-center items-center">
        <div class="bg-gray-700 w-full max-w-4xl h-[90vh] rounded-lg flex flex-col justify-between p-4">
            <div class="overflow-y-auto p-2 space-y-4">
                <div v-for="(message, index) in messages" :key="index" class="bg-gray-800 text-white p-3 rounded-md">
                    {{ message }}
                </div>
                <p class="text-white">{{ responses }}</p>
            </div>
            <div class="mt-6 bg-gray-500 p-3 rounded-lg flex items-center">
                <input class="flex-grow p-2 rounded-l-lg focus:outline-none" v-model="message" placeholder="Type your message" />
                <button class="bg-gray-600 text-white rounded-r-lg p-2 hover:bg-gray-700 transition-colors" @click="sendMessage">Send</button>
            </div>
        </div>
    </div>
</template>

  
<script>
    export default {
        data() {
            return {
            message: '',
            messages: [],
            responses: ''  // Array to hold each JSON object
            };
        },
        watch: {
        },
        methods: {
            async sendMessage() {
                this.messages.push(this.message)
                if (this.message.trim()) {
                    const url = '/api/sendMessage';
                    const requestOptions = {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ message: this.message })
                    };

                    try {
                        const response = await fetch(url, requestOptions);
                        if (!response.ok) {
                            throw new Error(`HTTP error! Status: ${response.status}`);
                        }
                        this.handleStream(response.body);
                    } catch (error) {
                        console.error('Error sending message:', error);
                    }
                }
            },

            handleStream(stream) {
            const reader = stream.getReader();
            let receivedLength = ''; // accumulated chunks

            const processStream = ({ done, value }) => {
                if (done) {
                    console.log("Stream complete");
                    return;
                }

                receivedLength += new TextDecoder("utf-8").decode(value, { stream: true });

                // Process the complete lines
                const lines = receivedLength.split('\n');
                receivedLength = lines.pop(); // Last line might be incomplete, keep it for the next round

                lines.forEach(line => {
                if (line) {
                    try {
                        const json = JSON.parse(line);
                        this.responses += json.response;
                    } catch (error) {
                        console.error('Error parsing JSON:', error);
                    }
                }
                });

                return reader.read().then(processStream);
            };

            reader.read().then(processStream);
            }
        }
    }
</script>
  