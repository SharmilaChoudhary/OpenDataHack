import React, { useRef, useState } from "react";
import { BiSolidCamera ,BiSolidCameraOff,BiSolidVideoPlus,BiSolidVideoOff,BiSolidMicrophone,BiSolidMicrophoneOff} from "react-icons/bi";
import { PiSpeakerSimpleNoneBold,PiSpeakerSimpleSlashBold } from "react-icons/pi";
import { useEventListener, useHuddle01 } from "@huddle01/react";
import { Audio, Video } from "@huddle01/react/components";


/* Uncomment to see the Xstate Inspector */
// import { Inspect } from '@huddle01/react/components';

import {
  useAudio,
  useLobby,
  useMeetingMachine,
  usePeers,
  useRoom,
  useVideo,
  useRecording,
} from "@huddle01/react/hooks";

import { useDisplayName } from "@huddle01/react/app-utils";
import Button from "../../components/Button";
import KYCForm from "../../KYCForm";
import Footer from "../../Footer";
const links = [
  { name: 'No Login', href: '#' },
  { name: 'No Signup', href: '#' },
  { name: 'Decentralized ', href: '#' },
  { name: 'Meet', href: '#' },
]
const stats = [
  { name: 'Offices worldwide', value: '12' },
  { name: 'Full-time colleagues', value: '300+' },
  { name: 'Hours per week', value: '40' },
  { name: 'Paid time off', value: 'Unlimited' },
]

const Home = () => {
  
  const videoRef = useRef<HTMLVideoElement>(null);

  const { state, send } = useMeetingMachine();

  const [roomId, setRoomId] = useState("");
  const [displayNameText, setDisplayNameText] = useState("Guest");
  const [projectId, setProjectId] = useState("");
  const [accessToken, setAccessToken] = useState("");

  const { initialize } = useHuddle01();
  const { joinLobby } = useLobby();
  const {
    fetchAudioStream,
    produceAudio,
    stopAudioStream,
    stopProducingAudio,
    stream: micStream,
  } = useAudio();
  const {
    fetchVideoStream,
    produceVideo,
    stopVideoStream,
    stopProducingVideo,
    stream: camStream,
  } = useVideo();
  const { joinRoom, leaveRoom } = useRoom();

  // Event Listner
  useEventListener("lobby:cam-on", () => {
    if (camStream && videoRef.current) videoRef.current.srcObject = camStream;
  });

  const { peers } = usePeers();

  const {
    startRecording,
    stopRecording,
    error,
    data: recordingData,
  } = useRecording();

  const { setDisplayName, error: displayNameError } = useDisplayName();

  useEventListener("room:joined", () => {
    console.log("room:joined");
  });
  useEventListener("lobby:joined", () => {
    console.log("lobby:joined");
  });

  

 
  return (
    //
    <div >
    <div className="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32">
   <img
     src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&crop=focalpoint&fp-y=.8&w=2830&h=1500&q=80&blend=111827&sat=-100&exp=15&blend-mode=multiply"
     alt=""
     className="absolute inset-0 -z-10 h-full w-full object-cover object-right md:object-center"
   />
   <div
     className="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl"
     aria-hidden="true"
   >
     <div
       className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
       style={{
         clipPath:
           'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
       }}
     />
   </div>
   <div
     className="absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:top-[-28rem] sm:ml-16 sm:translate-x-0 sm:transform-gpu"
     aria-hidden="true"
   >
     <div
       className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
       style={{
         clipPath:
           'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
       }}
     />
   </div>
   <div className="mx-auto max-w-7xl px-6 lg:px-8">
     <div className="mx-auto max-w-2xl lg:mx-0">
       <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">KYCdapp</h2>
       <p className="mt-6 text-lg leading-8 text-gray-300">
       Work With Us
       </p>
     </div>
     <div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
       <div className="grid grid-cols-1 gap-x-8 gap-y-6 text-base font-semibold leading-7 text-white sm:grid-cols-2 md:flex lg:gap-x-10">
         {links.map((link) => (
           <a key={link.name} href={link.href}>
             {link.name} <span aria-hidden="true">&rarr;</span>
           </a>
         ))}
       </div>
       {/* <dl className="mt-16 grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">
         {stats.map((stat) => (
           <div key={stat.name} className="flex flex-col-reverse">
             <dt className="text-base leading-7 text-gray-300">{stat.name}</dt>
             <dd className="text-2xl font-bold leading-9 tracking-tight text-white">{stat.value}</dd>
           </div>
         ))}
       </dl> */}
     </div>
   </div>
 </div>


<div>
<main className="flex min-h-full justify-center items-center bg-white  px-6 py-24 sm:py-32 lg:px-8">
   <div className="flex flex-col text-left "> {/* Add margin-right and spacing */}
     <div className=" bg-gray bg-opacity-10 rounded-md text-black px-6 text-xl font-semibold text-left mb-4">
       <h2 className="text-xl font-semibold mb-4">Important KYC Instructions:</h2>
       <ol className="list-decimal pl-6">
         <li className="mb-2">
           Ensure all provided documents are <span >clear, legible, and unaltered</span> to expedite the KYC process.
         </li>
         <li className="mb-2">
           Double-check that your personal information matches the details on your submitted documents to avoid delays.
         </li>
         <li className="mb-2">
           Complete all required forms accurately and provide <span >up-to-date contact information</span> for effective communication.
         </li>
         <li className="mb-2">
           Keep your identification documents and KYC information <span >confidential</span> to prevent identity theft and fraud.
         </li>
       </ol>
     </div>
   </div>
  
   <div className="flex flex-col text-right w-1/2 bg-white">
     <div text-center>
     <KYCForm/>
     </div>
     {/* Content for the second column */}

     {/* Add your content here */}
   </div>
 </main>
</div>

<div className="grid grid-cols-2 bg-white text-black justify-center ">
      
      <div >
        <h2 className="texl-5xl font-bold">
          Start YOUR KYC
        </h2>
{/* 
        <h2 className="text-2xl">Room State</h2>
        <h3 className="break-words">{JSON.stringify(state.value)}</h3>

        <h2 className="text-2xl">Me Id</h2>
        <div className="break-words">
          {JSON.stringify(state.context.peerId)}
        </div>
        <h2 className="text-2xl">DisplayName</h2>
        <div className="break-words">
          {JSON.stringify(state.context.displayName)}
        </div>
        <h2 className="text-2xl">Recording Data</h2>
        <div className="break-words">{JSON.stringify(recordingData)}</div>

        <h2 className="text-2xl">Error</h2>
        <div className="break-words text-red-500">
          {JSON.stringify(state.context.error)}
        </div>
        <h2 className="text-2xl">Peers</h2>
        <div className="break-words">{JSON.stringify(peers)}</div>
        <h2 className="text-2xl">Consumers</h2>
        <div className="break-words">
          {JSON.stringify(state.context.consumers)}
        </div> */}

        {/* <h2 className="text-3xl text-blue-500 font-extrabold">Idle</h2> */}
        <input
          type="text"
          placeholder="Your Project Id"
          value={projectId}
          onChange={(e) => setProjectId(e.target.value)}
          className="border-2 border-gray-300 h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none mr-2"
        />
        <Button
          disabled={!initialize.isCallable}
          onClick={() => {
            initialize(projectId);
          }}
        >
          INIT
        </Button>
       
        <br />
        <br />
        {/* <h2 className="text-3xl text-red-500 font-extrabold">Initialized</h2> */}
        <input
          type="text"
          placeholder="Your Room Id"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          className="border-2 border-gray-300 h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none mr-2"
        />
        <input
          type="text"
          placeholder="Your Access Token (optional)"
          value={accessToken}
          onChange={(e) => setAccessToken(e.target.value)}
          className="border-2 border-gray-300 h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none mr-2"
        />
        <Button
          disabled={!joinLobby.isCallable}
          onClick={() => {
            if (accessToken) joinLobby(roomId, accessToken);
            else joinLobby(roomId);
          }}
        >
          JOIN_LOBBY
        </Button>
        <br />
        <br />
        {/* <h2 className="text-3xl text-yellow-500 font-extrabold">Lobby</h2> */}
       
        
        <div className="flex gap-20 flex-wrap ">
          {/* <input
            type="text"
            placeholder="Your Room Id"
            value={displayNameText}
            onChange={(e) => setDisplayNameText(e.target.value)}
            className="border-2 border-gray-300 h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none "
          />
          
          <Button
          
            disabled={!setDisplayName.isCallable}
            onClick={() => {
              setDisplayName(displayNameText);

            }}
            
          >
            {`NAME ${displayNameError}`}
          </Button>
         
          <br/>
           */}
          <div>
          <Button
          
            disabled={!fetchVideoStream.isCallable}
            onClick={fetchVideoStream}
          >
            <BiSolidCamera/>
          {/* FETCH_VIDEO_STREAM */}
          </Button>
         
          <Button
            disabled={!fetchAudioStream.isCallable}
            onClick={fetchAudioStream}
          >
            <PiSpeakerSimpleNoneBold/>
            {/* FETCH_AUDIO_STREAM */}
          </Button>

          <Button disabled={!joinRoom.isCallable} onClick={joinRoom}>
            Start
            {/* JOIN_ROOM */}
          </Button>

          <Button
            disabled={!state.matches("Initialized.JoinedLobby")}
            onClick={() => send("LEAVE_LOBBY")}
          >
            LEAVE_LOBBY
          </Button>

          <Button
            disabled={!stopVideoStream.isCallable}
            onClick={stopVideoStream}
          >
            <BiSolidCameraOff/>
            {/* STOP_VIDEO_STREAM */}
          </Button>
          <Button
            disabled={!stopAudioStream.isCallable}
            onClick={stopAudioStream}
          >
            <PiSpeakerSimpleSlashBold/>
            {/* STOP_AUDIO_STREAM */}
          </Button>
          {/* //codee */}
          {/* <div className="flex gap-4 flex-wrap"> */}
          <Button
            disabled={!produceAudio.isCallable}
            onClick={() => produceAudio(micStream)}
          >
            <BiSolidMicrophone/>
            {/* PRODUCE_MIC */}
          </Button>

          <Button
            disabled={!produceVideo.isCallable}
            onClick={() => produceVideo(camStream)}
          >
            <BiSolidVideoPlus/>
            {/* PRODUCE_CAM */}
          </Button>

          <Button
            disabled={!stopProducingAudio.isCallable}
            onClick={() => stopProducingAudio()}
          >
            <BiSolidMicrophoneOff/>
            {/* STOP_PRODUCING_MIC */}
          </Button>

          <Button
            disabled={!stopProducingVideo.isCallable}
            onClick={() => stopProducingVideo()}
          >
            <BiSolidVideoOff/>
            {/* STOP_PRODUCING_CAM */}
          </Button>

          {/* <Button
            disabled={!startRecording.isCallable}
            onClick={() =>
              startRecording(`${window.location.href}rec/${roomId}`)
            }
          >
            {`START_RECORDING error: ${error}`}
          </Button>
          <Button disabled={!stopRecording.isCallable} onClick={stopRecording}>
            STOP_RECORDING
          </Button> */}

          <Button disabled={!leaveRoom.isCallable} onClick={leaveRoom}>
            End
            {/* LEAVE_ROOM */}
          </Button>
        {/* </div> */}


        </div>

        <br />
        
        {/* <h2 className="text-3xl text-green-600 font-extrabold">Room</h2> */}
        
        {/* Uncomment to see the Xstate Inspector */}
        {/* <Inspect /> */}
      </div>
      </div>
      <div>
        Me Video:
        <video 
        
        ref={videoRef} autoPlay muted></video>
        <div className="grid grid-cols-4 text-white">
          {Object.values(peers)
            .filter((peer) => peer.cam)
            .map((peer) => (
              <>
                role: {peer.role}
                <Video
                  key={peer.peerId}
                  peerId={peer.peerId}
                  track={peer.cam}
                  debug
                />
              </>
            ))}
          {Object.values(peers)
            .filter((peer) => peer.mic)
            .map((peer) => (
              <Audio key={peer.peerId} peerId={peer.peerId} track={peer.mic} />
            ))}
        </div>
      </div>
    </div>


 <Footer/>
 </div>
  
  );
};

export default Home;
