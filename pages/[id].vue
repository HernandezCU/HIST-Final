<template>
    <div class="absolute top-5 left-5 rounded-full w-16 h-16 bg-gray-700 flex justify-center items-center hover:scale-105 hover:bg-gray-800 transition-all duration-200">
        <svg class="w-8 h-8" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" fill="#000000">
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
            <g id="SVGRepo_iconCarrier"><path fill="#ffffff" d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"></path>
                <path fill="#ffffff" d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"></path>
            </g>
        </svg>
    </div>
    <div class="bg-gray-900 h-screen w-full flex justify-center items-center">
        <div class="bg-gray-700 w-full max-w-4xl h-[90vh] rounded-lg flex flex-col justify-between p-4">
            <div class="overflow-y-auto p-2 space-y-4">
                <div v-for="(message, index) in messages" :key="index"
                    :class="{'bg-gray-900': index%2 != 0, 'bg-gray-800': index%2 == 0}"
                    class="text-white p-3 rounded-md"
                    v-html="message">
                </div>
            </div>
            <div class="mt-6 bg-gray-500 p-3 rounded-lg flex items-center">
                <input class="flex-grow p-2 rounded-l-lg focus:outline-none" v-model="message" placeholder="Type your message" />
                <button class="bg-gray-600 text-white rounded-r-lg p-2 hover:bg-gray-700 transition-colors w-12 grid grid-cols-1 place-content-center place-items-center" @click="sendMessage">
                    <svg class="w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                        <g id="SVGRepo_iconCarrier"> 
                            <path d="M20.7639 12H10.0556M3 8.00003H5.5M4 12H5.5M4.5 16H5.5M9.96153 12.4896L9.07002 15.4486C8.73252 16.5688 8.56376 17.1289 8.70734 17.4633C8.83199 17.7537 9.08656 17.9681 9.39391 18.0415C9.74792 18.1261 10.2711 17.8645 11.3175 17.3413L19.1378 13.4311C20.059 12.9705 20.5197 12.7402 20.6675 12.4285C20.7961 12.1573 20.7961 11.8427 20.6675 11.5715C20.5197 11.2598 20.059 11.0295 19.1378 10.5689L11.3068 6.65342C10.2633 6.13168 9.74156 5.87081 9.38789 5.95502C9.0808 6.02815 8.82627 6.24198 8.70128 6.53184C8.55731 6.86569 8.72427 7.42461 9.05819 8.54246L9.96261 11.5701C10.0137 11.7411 10.0392 11.8266 10.0493 11.9137C10.0583 11.991 10.0582 12.069 10.049 12.1463C10.0387 12.2334 10.013 12.3188 9.96153 12.4896Z" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> 
                        </g>
                    </svg>
                </button>
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
                agent: 1
            };
        },
        async mounted(){
            await this.initializeAgent();
        },
        watch: {
        },
        methods: {
            formatMessage(msg) {
                // Function to escape HTML to avoid XSS
                const escapeHtml = text => text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
                msg = escapeHtml(msg);

                // Function to identify and wrap list items with <ul> if multiple *text* entries are found
                const wrapLists = text => {
                    // Split text into lines to process individually, assuming list items are on new lines
                    const lines = text.split('\n').map(line => {
                        // Check if line contains a list item marker
                        if (line.trim().startsWith('*') && line.trim().endsWith('*')) {
                            return `<li>${line.trim().slice(1, -1)}</li>`; // Convert to <li> by stripping asterisks
                        } else {
                            return line; // Return line unchanged
                        }
                    });
                    // Only wrap with <ul> if there are any <li> elements
                    if (lines.some(line => line.startsWith('<li>'))) {
                        return `<ul>${lines.join('')}</ul>`;
                    } else {
                        return lines.join(''); // Join lines back into a single string without <ul>
                    }
                };

                // Applying the wrapLists function to format the message properly
                return wrapLists(msg);
            },
            async sendMessage() {

                console.log('here')

                this.messages.push(this.message)
                this.messages.push('')
                if (this.message.trim()) {
                    console.log('here2');
                    const url = '/api/sendMessage';
                    const requestOptions = {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ message: this.message, agent: this.agent, initial: false })
                    };
                    
                    this.message = '';
                    
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
            async initializeAgent(){
                // get slug from page
                
                var agent = this.$route.params.id;
                
                if (agent == 'george'){
                    this.agent = 1;
                }
                else if (agent == 'clara'){
                    this.agent = 2;
                }
                else if (agent == 'michael'){
                    this.agent = 3;
                }
                else {
                    window.location.href = '/'
                }

                this.messages.push('')

                const url = '/api/sendMessage';
                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ message: 'Introduce yourself in detail!', agent: this.agent, initial: true })
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
                        // this.responses += json.response;
                        this.messages[this.messages.length -1 ] += json.response;
                        this.messages[this.messages.length -1 ] = this.messages[this.messages.length -1].replace('*', '')
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