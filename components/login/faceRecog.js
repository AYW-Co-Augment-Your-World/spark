import { Permissions, Camera, FaceDetector, } from 'expo';

async componentWillMount() {
  const { status } =await Permissions.askAsync(Permissions.CAMERA);
  this.setState({hasCameraPermission:status==='granted'});
}