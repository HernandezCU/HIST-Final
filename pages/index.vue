<template>
    <div class="bg-gray-900 w-full h-screen grid grid-cols-1 place-items-center place-content-center">
        <div class="w-11/12 lg:w-3/4 grid lg:grid-cols-3 grid-cols-1 place-item-center place-content-center bg-gray-700 rounded-[10px] h-[75svh] shadow-2xl px-6">
            <div class="w-full grid grid-cols-1 place-content-center place-items-center h-[45vh] rounded-[10px] transition-all duration-300">
                <div class="old rounded-full blur-[0.25px]">
                    <img class="h-40 w-40 rounded-full aspect-square object-cover" src="/images/1.webp"/>
                </div>
                <div class="bg-gray-500 rounded-[10px] px-8 py-4 mt-16 w-10/12">
                    <p class="mt-4 text-lg font-bold text-white w-full text-center">George T. Harrington</p>
                    <p class="text-white font-bold text-xs mt-2 w-full text-left">Age: <u>45</u></p>
                    <p class="text-white font-bold text-xs mt-2 w-full text-left">Period: <u>1845-1890</u></p>
                    <p class="text-white font-bold text-xs mt-2 w-full text-left">Background: <u>Born in Pittsburgh, Pennsylvania to a family of modest means</u></p>
                    <p class="text-white font-bold text-xs mt-2 w-full text-left mb-6">Occupation: <u>Industrialist, specifically involved in the steel industry</u></p>
                </div>
                <button class="mt-12 px-20 py-4 rounded-[10px] bg-gradient-to-r from-blue-700 to-blue-500 hover:bg-gradient-to-br transition-all duration-300 text-white font-bold w-10/12" @click="$router.push('/george')">Chat with George</button>
            </div>
            <div class="w-full grid grid-cols-1 place-content-center place-items-center h-[45vh] rounded-[10px] transition-all duration-300">
                <div class="midold rounded-full blur-[0.25px]">
                    <img class="h-40 w-40 rounded-full aspect-square object-cover" src="/images/2.webp"/>
                </div>
                <div class="bg-gray-500 rounded-[10px] px-8 py-4 mt-16 w-10/12">
                    <p class="mt-4 text-lg font-bold text-white w-full text-center">Clara Mae Johnson</p>
                    <p class="text-white font-bold text-xs mt-2 w-full text-left">Age: <u>32</u></p>
                    <p class="text-white font-bold text-xs mt-2 w-full text-left">Period: <u>1941-1970</u></p>
                    <p class="text-white font-bold text-xs mt-2 w-full text-left">Background: <u>Born and raised in Birmingham, Alabama</u></p>
                    <p class="text-white font-bold text-xs mt-2 w-full text-left mb-6">Occupation: <u>School teacher and civil rights activist</u></p>
                </div>
                <button class="mt-12 px-20 py-4 rounded-[10px] bg-gradient-to-r from-blue-700 to-blue-500 hover:bg-gradient-to-br transition-all duration-300 text-white font-bold w-10/12" @click="$router.push('/clara')">Chat with Clara</button>
            </div> 
            <div class="w-full grid grid-cols-1 place-content-center place-items-center h-[45vh] rounded-[10px] transition-all duration-300">
                <div class="rounded-full blur-[0.75px] brightness-75 old">
                    <img class="h-40 w-40 rounded-full aspect-square object-cover" src="/images/3.webp"/>
                </div>
                <div class="bg-gray-500 rounded-[10px] px-8 py-4 mt-16 w-10/12">
                    <p class="mt-4 text-lg font-bold text-white ">Michael Ramirez</p>
                    <p class="text-white font-bold text-xs mt-2 w-full text-left">Age: <u>28</u></p>
                    <p class="text-white font-bold text-xs mt-2 w-full text-left">Period: <u>1980-2000</u></p>
                    <p class="text-white font-bold text-xs mt-2 w-full text-left">Background: <u>Born in San Jose, California, to a Mexican-American family</u></p>
                    <p class="text-white font-bold text-xs mt-2 w-full text-left mb-6">Occupation: <u>Software developer and internet pioneer</u></p>
                </div>
                <button class="mt-12 px-20 py-4 rounded-[10px] bg-gradient-to-r from-blue-700 to-blue-500 hover:bg-gradient-to-br transition-all duration-300 text-white font-bold w-10/12" @click="$router.push('/michael')">Chat with Michael</button>
            </div>
        </div>
    </div>
  </template>
<script>

</script>
<style>
.old {
  position: relative;
  overflow: hidden;
}

.old::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('/images/old.jpeg'); /* Link to a grain texture image */
  opacity: 0.4; /* Adjust the visibility of the grain */
  z-index: 1;
  pointer-events: none;
}

.midold {
  position: relative;
  overflow: hidden;
}

.midold::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('/images/old3.jpeg'); /* Link to a grain texture image */
  opacity: 0.5; /* Adjust the visibility of the grain */
  z-index: 1;
  pointer-events: none;
}

</style>