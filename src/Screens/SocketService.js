import { io } from "socket.io-client"

const SOCKET_URL = 'https://kind-pear-tadpole-hem.cyclic.app'

class WSService {
    initializeSocket = async() => {
        try{
            this.socket = io(SOCKET_URL, {
                transports:['websocket']
            })

            console.log("intialing socket", this.socket)
            this.socket.on('connect', (data)=>{
                console.log("Socket Conected",)
            })

            this.socket.on('disconnect', (data)=>{
                console.log("Socket disconnected")
            })

            this.socket.on('error', (data)=>{
                console.log("Socket error",data)
            })
        }catch(e){
            console.log("socket is not intialized",e)
        }
    }


    emit(event, data={}){
        this.socket.emit(event, data)
    }

    on(event, cb){
        this.socket.on(event, cb)
    }

    removeListener(listnername){
        this.socket.removeListener(listnername)
    }
}

const socketServices = new WSService()

export default socketServices