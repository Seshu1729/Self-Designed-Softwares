import websocket

def zingzing(host_addr,option,player_id,rgb):
    ws = websocket.WebSocket()
    ws.connect(host_addr)
    ws.send(option+str(player_id)+str(rgb))