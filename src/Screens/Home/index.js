import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import Geolocation from "@react-native-community/geolocation";
import Lottie from "lottie-react-native";
import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import Modal from "react-native-modal";
import { RadioButton } from "react-native-paper";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import Entypo from "react-native-vector-icons/Entypo";
import Fontisto from "react-native-vector-icons/Fontisto";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useDispatch } from "react-redux";
import CustomButton from "../../Components/Button";
import InputField from "../../Components/InputFiled";
import CustomText from "../../Components/Text";
import images from "../../Constants/images";
import { COLORS } from "../../Constants/theme";
import { logOut } from "../../Redux/authSlice";
import { styles } from "./index.style";

const Home = ({ navigation }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [isregisterModalVisible, setRegisterModalVisible] = useState(false);
  const [isplaceYourAddModal, setPlaceYourAddModal] = useState(false);
  const [isSelectPackageModal, setSelectPackageModal] = useState(false);
  const [isPaymentModalVisible, setPaymentModalVisible] = useState(false);
  const [isThanksModalVisible, setThanksModalVisible] = useState(false);
  const [isConfirmModalVisible, setConfirmModalVisible] = useState(false);
  const [isSettingsModalVisible, setSettingsModalVisible] = useState(false);
  const [isSelectDistinationVisible, setSelectDistinationVisible] = useState(
    false
  );
  const [checked, setChecked] = useState();
  const [startLocation, setStartLocation] = useState(null);
  const [endLocation, setEndLocation] = useState(null);
  const [myLocation, setMyLocation] = useState(region);

  const handleDirectionsReady = (result) => {
    result?.coordinates;
  };

  const handleStartLocationSelect = (data, details) => {
    // Handle start location selection from autocomplete
    const coordinate = {
      latitude: details.geometry.location.lat,
      longitude: details.geometry.location.lng,
    };

    setStartLocation({ name: data.description, coordinate });
  };

  const handleEndLocationSelect = (data, details) => {
    // Handle end location selection from autocomplete
    const coordinate = {
      latitude: details.geometry.location.lat,
      longitude: details.geometry.location.lng,
    };
    setEndLocation({ name: data.description, coordinate });
  };

  const animateToRegion = (coordinate) => {
    // Animate the map to focus on a specific coordinate
    mapRef.current.animateToRegion(
      {
        ...coordinate,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      },
      1000
    );
  };

  const [region, setRegion] = useState({
    latitude: 43.0,
    longitude: -75.0,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const mapRef = useRef(null);
  const dispatch = useDispatch();

  // Function to handle place selection

  useEffect(() => {
    // Request location permission
    Geolocation.requestAuthorization();

    // Set up location tracking (update every 1000 milliseconds or 1 second)
    Geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position?.coords;
        setMyLocation({
          latitude,
          longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        });
      },
      (error) => console.log(error),
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
        distanceFilter: 10,
      }
    );

    // Clean up the location tracking when the component is unmounted
    // return () => {
    //   Geolocation.clearWatch(locationWatchId);
    // };
  }, []);
  console.log("my location ?????????????????", myLocation);
  const handleMapPress = (event) => {
    const { coordinate } = event.nativeEvent;
    // Check if startLocation is already set, if not, set it
    if (!startLocation) {
      setStartLocation({ coordinate });
    } else {
      // If startLocation is set, set endLocation
      setEndLocation({ coordinate });
    }
  };

  useEffect(() => {
    // renderCoords();
    Geolocation.getCurrentPosition((pos) => {
      const crd = pos.coords;
      setRegion({
        latitude: crd.latitude,
        longitude: crd.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      });
    });
  }, []);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const toggleRegisterModal = () => {
    setRegisterModalVisible(!isregisterModalVisible);
    toggleModal();
  };
  const togglePlaceYourAdd = () => {
    setPlaceYourAddModal(!isplaceYourAddModal);
    toggleModal();
    setRegisterModalVisible(false);
  };
  const toggleSelectPackage = () => {
    setSelectPackageModal(!isSelectPackageModal);
    setModalVisible(false);
    setPlaceYourAddModal(false);
    setRegisterModalVisible(false);
    setPlaceYourAddModal(false);
  };
  const toggleMakePayment = () => {
    setPaymentModalVisible(!isPaymentModalVisible);
    setModalVisible(false);
    setPlaceYourAddModal(false);
    setRegisterModalVisible(false);
    setSelectPackageModal(false);
  };
  const toggleThankYou = () => {
    setThanksModalVisible(!isThanksModalVisible);
    setModalVisible(false);
    setPlaceYourAddModal(false);
    setRegisterModalVisible(false);
    setSelectPackageModal(false);
    setPaymentModalVisible(false);
  };
  const toggleConfirm = () => {
    setConfirmModalVisible(!isConfirmModalVisible);
    setModalVisible(false);
    setPlaceYourAddModal(false);
    setRegisterModalVisible(false);
    setSelectPackageModal(false);
    setPaymentModalVisible(false);
    setThanksModalVisible(false);
  };
  const toggleModalSettings = () => {
    setSettingsModalVisible(!isSettingsModalVisible);
    setModalVisible(false);
  };
  const toggleDistinationModal = () => {
    setSelectDistinationVisible(!isSelectDistinationVisible);
  };
  const nearByData = [
    {
      id: 1,
      name: "Icon 1",
      iconName: "local-restaurant",
      title: "Restaurants",
    },
    {
      id: 2,
      name: "Icon 2",
      iconName: "coffee",
      title: "Coffee",
    },
    {
      id: 3,
      name: "Icon 2",
      iconName: "local-hospital",
      title: "Hospital",
    },
    {
      id: 4,
      name: "Icon 2",
      iconName: "coffee",
      title: "Coffee",
    },
  ];

  // ref
  const bottomSheetRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => ["12%", "45%"], []);



  return (
    <View style={{ flex: 1 }}>
      <View style={styles.menuBtn}>
        <TouchableOpacity
          style={{ position: "absolute" }}
          onPress={() => toggleModal()}
        >
          <Entypo name={"menu"} size={30} color={"#fff"} style={{}} />
        </TouchableOpacity>
      </View>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={region}
        // showsUserLocation={true}
        showsMyLocationButton={true}
        followsUserLocation={true}
        // showsCompass={true}
        scrollEnabled={true}
        zoomEnabled={true}
        pitchEnabled={true}
        rotateEnabled={true}
        userLocationAnnotationTitle="My Locations"
        region={region}
        onRegionChangeComplete={(resp) => setRegion(resp)}
      >
        {myLocation ? (
          <Marker title="My Location " coordinate={myLocation}>
            <View style={{ width: 50, height: 80 }}>
              <Image
                source={images.carMarker} // Your marker image source
                style={{
                  flex: 1,
                  width: null,
                  height: null,
                  resizeMode: "contain",
                }}
              />
            </View>
          </Marker>
        ) : null}
        {startLocation ? (
          <Marker
            title="Selected Location"
            coordinate={startLocation?.coordinate}
          >
            <View style={{ width: 50, height: 50 }}>
              <Image
                source={images.markerImage} // Your marker image source
                style={{
                  flex: 1,
                  width: null,
                  height: null,
                  resizeMode: "contain",
                }}
              />
            </View>
          </Marker>
        ) : null}
        {endLocation ? (
          <Marker title="End Location" coordinate={endLocation?.coordinate} />
        ) : null}
        {startLocation && endLocation ? (
          <MapViewDirections
            origin={startLocation?.coordinate}
            destination={endLocation?.coordinate}
            apikey={"AIzaSyCxPKJMEW5ko5BoDLW5F3K4bzs-faQaHU8"}
            strokeWidth={6}
            strokeColor="green"
            onReady={handleDirectionsReady}
          //  zIndex={0}
          />
        ) : null}
      </MapView>

      <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        backgroundStyle={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      // onChange={handleSheetChanges}
      >
        <View style={styles.contentContainer}>
          <View style={{ flexDirection: "row" }}>
            <MaterialIcons
              name={"location-pin"}
              size={25}
              color={"#fff"}
              style={{ marginTop: 10 }}
            />
            <GooglePlacesAutocomplete
              placeholder="Search here..."
              onPress={(data, details = null) => {
                console.log("Selected Place Data:", data);
                console.log("Selected Place details:", details);
                let chosenRegion = {
                  longitude: details.geometry.location.lng,
                  latitude: details.geometry.location.lat,
                  latitudeDelta: 0.005,
                  longitudeDelta: 0.005,
                };
                setRegion(chosenRegion);
                mapRef.current.animateToRegion(chosenRegion, 1000);
              }}
              textInputProps={{
                placeholderTextColor: "#fff",
              }}
              fetchDetails={true}
              query={{
                key: "AIzaSyCxPKJMEW5ko5BoDLW5F3K4bzs-faQaHU8",
                language: "en",
              }}
              autoFillOnNotFound={true}
              styles={{
                container: {
                  // borderColor: "black",
                  // backgroundColor:'red'
                },
                textInputContainer: {
                  // backgroundColor: "#73737E",
                },
                textInput: {
                  height: 48,
                  fontSize: 16,
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  color: "white",
                },
                predefinedPlacesDescription: {},
              }}
            />

            <MaterialIcons
              name={"search"}
              size={25}
              color={"#fff"}
              style={{ marginTop: 10 }}
            />
          </View>
          <CustomButton
            buttonText={"select your pick and drop"}
            style={styles.selectYourPickAndDrop}
            // lllllllllllllllllllllllllllllllllllllllllllll
            onPress={() => toggleDistinationModal()}
          />
          <BottomSheetFlatList
            showsHorizontalScrollIndicator={false}
            horizontal
            data={nearByData}
            renderItem={({ item }) => {
              return (
                <View style={styles.flatlist_container}>
                  <TouchableOpacity style={styles.nearByData_View}>
                    <MaterialIcons
                      name={item.iconName}
                      size={18}
                      color="white"
                    />
                    <CustomText
                      text={item.title}
                      style={{ marginHorizontal: 6, fontSize: 16 }}
                    />
                  </TouchableOpacity>
                </View>
              );
            }}
          />
        </View>
      </BottomSheet>
      {/* menu modal */}
      <Modal
        animationIn="slideInLeft"
        animationOut="slideOutRight"
        isVisible={isModalVisible}
        style={styles.modal_Main_container}
      >
        <View style={styles.modal_container}>
          <View style={[styles.closebtn, { alignSelf: "flex-end" }]}>
            <TouchableOpacity onPress={() => toggleModal()}>
              <Ionicons name={"close"} size={30} color={"#fff"} style={{}} />
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: "row" }}>
            <View style={{ bottom: 20, marginLeft: 30 }}>
              <Image source={images.avatar} />
            </View>
            <View style={{ bottom: 20, marginLeft: 15 }}>
              <CustomText
                text={"Lilly Unrah"}
                style={{ fontSize: 16, fontWeight: "700" }}
              />
              <TouchableOpacity
                style={{
                  height: 25,
                  width: 85,
                  backgroundColor: "rgb(208, 208, 229)",
                  marginTop: 38,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 20,
                }}
              >
                <CustomText text={"View Profile"} style={{ fontSize: 11 }} />
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{ backgroundColor: "#fff", height: 1.5, marginTop: 10 }}
          />
          <TouchableOpacity
            onPress={() => toggleRegisterModal()}
            style={styles.menu_btn}
          >
            <CustomText
              text={"Register Your Location"}
              style={styles.title_btn}
            />
            <Entypo
              name={"chevron-small-right"}
              size={30}
              color={"#fff"}
              style={{}}
            />
          </TouchableOpacity>
          <View
            style={{ backgroundColor: "#fff", height: 1.5, marginTop: 10 }}
          />
          <TouchableOpacity
            onPress={() => {
              togglePlaceYourAdd();
            }}
            style={styles.menu_btn}
          >
            <CustomText text={"Place Your Ad"} style={styles.title_btn} />
            <Entypo
              name={"chevron-small-right"}
              size={30}
              color={"#fff"}
              style={{}}
            />
          </TouchableOpacity>
          <View
            style={{ backgroundColor: "#fff", height: 1.5, marginTop: 10 }}
          />
          <TouchableOpacity
            onPress={() => toggleModalSettings()}
            style={styles.menu_btn}
          >
            <CustomText text={"Settings"} style={styles.title_btn} />
            <Entypo
              name={"chevron-small-right"}
              size={30}
              color={"#fff"}
              style={{}}
            />
          </TouchableOpacity>
          <View
            style={{ backgroundColor: "#fff", height: 1.5, marginTop: 10 }}
          />
          <TouchableOpacity style={styles.menu_btn}>
            <CustomText text={"Help and Feedback"} style={styles.title_btn} />
          </TouchableOpacity>
          <View
            style={{ backgroundColor: "#fff", height: 1.5, marginTop: 10 }}
          />
          <TouchableOpacity
            onPress={() => {
              dispatch(logOut());
            }}
            style={styles.menu_btn}
          >
            <CustomText text={"Logout"} style={styles.title_btn} />
          </TouchableOpacity>
        </View>
      </Modal>
      {/* Register Your Location */}
      <Modal
        animationIn="slideInLeft"
        animationOut="slideOutRight"
        isVisible={isregisterModalVisible}
        style={styles.modal_Main_container}
        avoidKeyboard={false}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <View style={styles.modal_container}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <CustomText
                text={"Register Your Location"}
                style={{
                  marginHorizontal: 20,
                  fontSize: 18,
                  fontWeight: "bold",
                  marginTop: 18,
                }}
              />
              <TouchableOpacity
                style={styles.closebtn}
                onPress={() => {
                  toggleRegisterModal();
                }}
              >
                <Ionicons name={"close"} size={30} color={"#fff"} style={{}} />
              </TouchableOpacity>
            </View>
            <ScrollView>
              <View
                style={{
                  backgroundColor: "#1EF1F5",
                  height: 1.5,
                  marginTop: 20,
                }}
              ></View>
              <View style={{ marginHorizontal: 25, marginTop: 15 }}>
                <InputField placeholder={"Enter Your Business Location"} />
                <InputField placeholder={"Business Name"} />
                <InputField placeholder={"Your Phone Number"} />
                <InputField placeholder={"Your Email Address"} />

                <CustomButton
                  buttonText={"Continue"}
                  onPress={() => toggleThankYou()}
                />
              </View>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </Modal>
      {/* Place Your Ad.. */}
      <Modal
        animationIn="slideInLeft"
        animationOut="slideOutRight"
        isVisible={isplaceYourAddModal}
        style={styles.modal_Main_container}
      >
        <View style={styles.modal_container}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <CustomText
              text={"Place Your Ad.."}
              style={{
                marginHorizontal: 20,
                fontSize: 18,
                fontWeight: "bold",
                marginTop: 18,
              }}
            />
            <TouchableOpacity
              style={styles.closebtn}
              onPress={() => {
                togglePlaceYourAdd();
              }}
            >
              <Ionicons name={"close"} size={30} color={"#fff"} style={{}} />
            </TouchableOpacity>
          </View>
          <View
            style={{
              backgroundColor: "#1EF1F5",
              height: 1.5,
              marginTop: 20,
            }}
          ></View>
          <ScrollView>
            <View style={{ marginHorizontal: 25, marginTop: 15 }}>
              <InputField placeholder={"Enter Your Business Location"} />
              <InputField placeholder={"Business Name"} />
              <InputField placeholder={"Business Category"} />
              <InputField placeholder={"Your Phone Number"} />
              <InputField placeholder={"Your Email Address"} />

              <CustomButton
                buttonText={"Select Package"}
                onPress={() => toggleSelectPackage()}
              />
            </View>
          </ScrollView>
        </View>
      </Modal>
      {/* Select package.. */}
      <Modal
        animationIn="slideInLeft"
        animationOut="slideOutRight"
        isVisible={isSelectPackageModal}
        style={styles.modal_Main_container}
      >
        <View style={styles.modal_container}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <CustomText
              text={"Select Package"}
              style={{
                marginHorizontal: 20,
                fontSize: 18,
                fontWeight: "bold",
                marginTop: 18,
              }}
            />
            <TouchableOpacity
              style={styles.closebtn}
              onPress={() => {
                toggleSelectPackage();
              }}
            >
              <Ionicons name={"close"} size={30} color={"#fff"} style={{}} />
            </TouchableOpacity>
          </View>
          <View
            style={{
              backgroundColor: "#1EF1F5",
              height: 1.5,
              marginTop: 20,
            }}
          ></View>
          <View style={{ marginHorizontal: 25, marginTop: 15 }}>
            <TouchableOpacity
              onPress={() => setChecked("first")}
              style={[
                styles.checkingView,
                checked === "first"
                  ? { borderColor: COLORS.primary, borderWidth: 1.5 }
                  : null,
              ]}
            >
              <RadioButton
                value="first"
                color={COLORS.primary}
                uncheckedColor="#fff"
                status={checked === "first" ? "checked" : "unchecked"}
                style={styles.radiobtn}
                onPress={() => setChecked("first")}
              />
              <View style={{ marginHorizontal: 15 }}>
                <CustomText
                  text={"$119.99/Yearly"}
                  style={{ fontSize: 18, fontWeight: "bold" }}
                />
                <CustomText text={"$9.99/Month billed annually "} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setChecked("second")}
              style={[
                styles.checkingView,
                checked === "second"
                  ? { borderColor: COLORS.primary, borderWidth: 1.5 }
                  : null,
              ]}
            >
              <RadioButton
                value="second"
                color={COLORS.primary}
                uncheckedColor="#fff"
                status={checked === "second" ? "checked" : "unchecked"}
                style={styles.radiobtn}
                onPress={() => setChecked("second")}
              />
              <View style={{ marginHorizontal: 15 }}>
                <CustomText
                  text={"$50.99/Monthly"}
                  style={{ fontSize: 18, fontWeight: "bold" }}
                />
                <CustomText text={"$50.99/ billed for 1 month"} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setChecked("third")}
              style={[
                styles.checkingView,
                checked === "third"
                  ? { borderColor: COLORS.primary, borderWidth: 1.5 }
                  : null,
              ]}
            >
              <RadioButton
                value="third"
                color={COLORS.primary}
                uncheckedColor="#fff"
                status={checked === "third" ? "checked" : "unchecked"}
                style={styles.radiobtn}
                onPress={() => setChecked("third")}
              />
              <View style={{ marginHorizontal: 15 }}>
                <CustomText
                  text={"$15.99/weekly"}
                  style={{ fontSize: 18, fontWeight: "bold" }}
                />
                <CustomText text={"$15.99/ billed for 1 week"} />
              </View>
            </TouchableOpacity>
            <CustomButton
              buttonText={"Continue"}
              onPress={() => toggleMakePayment()}
            />
          </View>
        </View>
      </Modal>
      {/* Make Your Payment.. */}
      <Modal
        animationIn="slideInLeft"
        animationOut="slideOutRight"
        isVisible={isPaymentModalVisible}
        style={{
          width: "100%",
          margin: 0,
        }}
      >
        <View style={styles.modal_container}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <CustomText
              text={"Make Your Payment"}
              style={{
                marginHorizontal: 20,
                fontSize: 18,
                fontWeight: "bold",
                marginTop: 18,
              }}
            />
            <TouchableOpacity
              style={styles.closebtn}
              onPress={() => {
                toggleMakePayment();
              }}
            >
              <Ionicons name={"close"} size={30} color={"#fff"} style={{}} />
            </TouchableOpacity>
          </View>
          <View style={styles.cardView}>
            <View
              style={{
                flexDirection: "row",
                marginTop: 15,
                justifyContent: "space-around",
              }}
            >
              <CustomText
                text={"Current credit card"}
                style={{ fontSize: 12 }}
              />
              <CustomText
                text={"Add new credit card"}
                style={{ fontSize: 12 }}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                paddingHorizontal: 10,
                justifyContent: "space-between",
                marginTop: 10,
              }}
            >
              <View
                style={{
                  height: 90,
                  width: wp("33%"),
                  borderWidth: 1,
                  borderColor: "white",
                  borderRadius: 10,
                  padding: 10,
                }}
              >
                {/* <FontAwesome name={'cc-visa'} size={20} color={'white'} /> */}

                <Fontisto name={"visa"} size={20} color={"#fff"} style={{}} />

                <Text
                  style={{
                    fontSize: hp("1.6%"),
                    color: "white",
                    marginTop: 12,
                  }}
                >
                  •••• •••• •••• 3294
                </Text>

                <Text style={{ fontSize: hp("1.3%"), color: "white" }}>
                  Howard Pinsky
                </Text>
              </View>
              <TouchableOpacity>
                <View
                  style={{
                    height: 90,
                    width: wp("33%"),
                    borderWidth: 1,
                    borderColor: "white",
                    borderRadius: 10,
                    padding: 10,
                    backgroundColor: "white",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <View
                    style={{
                      height: 20,
                      width: 20,
                      backgroundColor: "#611885",
                      borderRadius: 200,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text style={{ fontWeight: "bold", color: "white" }}>
                      +
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
            <View style={{ marginHorizontal: 10 }}>
              <Text
                style={{ color: "white", fontSize: hp("1.3%"), marginTop: 15 }}
              >
                Name of card holder
              </Text>

              <TextInput
                placeholder="Howard Pinsky"
                style={{
                  borderWidth: 2,
                  borderColor: "white",
                  borderRadius: 20,
                  color: "white",
                  paddingHorizontal: 20,
                  marginTop: 10,
                  backgroundColor: "#A2A2A2",
                  opacity: 0.8,
                }}
                placeholderTextColor={"white"}
              />

              <Text
                style={{ color: "white", fontSize: hp("1.3%"), marginTop: 15 }}
              >
                Credit card number
              </Text>
              <TextInput
                placeholder="1234   3924   2394   3294"
                style={{
                  borderWidth: 2,
                  borderColor: "white",
                  borderRadius: 20,
                  color: "white",
                  paddingHorizontal: 20,
                  marginTop: 10,
                  backgroundColor: "#376CE3",
                }}
                placeholderTextColor={"white"}
              />

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View>
                  <Text style={{ color: "white", marginTop: 10, fontSize: 12 }}>
                    Expiration
                  </Text>
                  <TextInput
                    placeholder="02/25"
                    placeholderTextColor={"white"}
                    style={{
                      borderWidth: 1,
                      borderColor: "#A2A2A2",
                      borderRadius: 10,
                      width: wp("35%"),
                      height: 40,
                      paddingHorizontal: 10,
                      marginTop: 10,
                      color: "white",
                    }}
                  />
                </View>

                <View>
                  <Text style={{ color: "white", marginTop: 10, fontSize: 12 }}>
                    CVV
                  </Text>
                  <TextInput
                    placeholder="231"
                    placeholderTextColor={"white"}
                    style={{
                      borderWidth: 1,
                      borderColor: "#A2A2A2",
                      borderRadius: 10,
                      width: wp("35%"),
                      height: 40,
                      paddingHorizontal: 10,
                      marginTop: 10,
                      color: "white",
                    }}
                  />
                </View>
              </View>
            </View>
            <CustomButton
              style={{ top: 20 }}
              buttonText={"Make Payment"}
              onPress={() => toggleConfirm()}
            />
          </View>
        </View>
      </Modal>
      {/* thank you.. */}
      <Modal
        animationIn="slideInLeft"
        animationOut="slideOutRight"
        isVisible={isThanksModalVisible}
        style={{ flex: 0.9, width: "100%", margin: 0 }}
      >
        <View
          style={{
            backgroundColor: "rgba(220, 220, 204, 0.8)",
            flex: 0.5,
            opacity: 0.8,
            width: "100%",
            borderColor: "#1EF1F5",
            borderWidth: 1.2,
            marginTop: 20,
          }}
        >
          <TouchableOpacity
            style={[styles.closebtn, { alignSelf: "flex-end" }]}
            onPress={() => {
              toggleThankYou();
            }}
          >
            <Ionicons name={"close"} size={30} color={"#fff"} style={{}} />
          </TouchableOpacity>

          <View style={styles.thankYouView}>
            <CustomText
              text={"Thank You For Using \n        Our Service"}
              style={styles.thankYouView}
            />
            <Lottie
              source={images.thanks}
              autoPlay
              style={{
                height: 130,
                width: 130,
                marginTop: 20,
              }}
            />
          </View>
        </View>
      </Modal>
      {/* tConfirm.. */}
      <Modal
        animationIn="slideInLeft"
        animationOut="slideOutRight"
        isVisible={isConfirmModalVisible}
        style={styles.modal_Main_container}
      >
        <View
          style={{
            backgroundColor: "rgba(220, 220, 204, 0.8)",
            flex: 0.5,
            opacity: 0.8,
            width: "100%",
            borderColor: "#1EF1F5",
            borderWidth: 1.2,
            marginTop: 20,
          }}
        >
          <TouchableOpacity
            style={[styles.closebtn, { alignSelf: "flex-end" }]}
            onPress={() => {
              toggleConfirm();
            }}
          >
            <Ionicons name={"close"} size={30} color={"#fff"} style={{}} />
          </TouchableOpacity>

          <View style={styles.thankYouView}>
            <CustomText
              text={
                " Your Ad are placed \n after 24 hours will confirm \n you through Email.."
              }
              style={styles.thankYouView}
            />
            {/* <Lottie
              source={images.thanks}
              autoPlay
              style={{
                height: 130,
                width: 130,
                marginTop: 20,
              }}
            /> */}
          </View>
        </View>
      </Modal>
      {/* Settings.. */}
      <Modal
        animationIn="slideInLeft"
        animationOut="slideOutRight"
        isVisible={isSettingsModalVisible}
        style={{ flex: 1, width: "100%", margin: 0 }}
      >
        <View style={styles.modal_container}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <CustomText
              text={"Settings"}
              style={{
                marginHorizontal: 20,
                fontSize: 20,
                fontWeight: "bold",
                marginTop: 18,
              }}
            />
            <TouchableOpacity
              style={styles.closebtn}
              onPress={() => {
                toggleModalSettings();
              }}
            >
              <Ionicons name={"close"} size={30} color={"#fff"} style={{}} />
            </TouchableOpacity>
          </View>
          <View
            style={{
              backgroundColor: "#1EF1F5",
              height: 1.5,
              marginTop: 20,
            }}
          />
          <ScrollView style={{ top: 5 }}>
            <View
              style={{
                backgroundColor: "#CFCFCF",
                marginHorizontal: 20,
                marginTop: 20,
                borderRadius: 10,
              }}
            >
              <TouchableOpacity style={styles.menu_btn}>
                <CustomText text={"General"} style={styles.title_btn} />
                <Entypo
                  name={"chevron-small-right"}
                  size={30}
                  color={"#fff"}
                  style={{}}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.menu_btn}>
                <CustomText text={"Map Display"} style={styles.title_btn} />
                <Entypo
                  name={"chevron-small-right"}
                  size={30}
                  color={"#fff"}
                  style={{}}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.menu_btn}>
                <CustomText text={"Voice and Sound"} style={styles.title_btn} />
                <Entypo
                  name={"chevron-small-right"}
                  size={30}
                  color={"#fff"}
                  style={{}}
                />
              </TouchableOpacity>
            </View>
            <CustomText
              text={"Driving preference"}
              style={{
                fontSize: 18,
                fontWeight: "bold",
                marginHorizontal: 20,
                marginTop: 10,
              }}
            />
            <View
              style={{
                backgroundColor: "#CFCFCF",
                marginHorizontal: 20,
                marginTop: 20,
                borderRadius: 10,
              }}
            >
              <TouchableOpacity style={styles.menu_btn}>
                <CustomText text={"Navigation"} style={styles.title_btn} />
                <Entypo
                  name={"chevron-small-right"}
                  size={30}
                  color={"#fff"}
                  style={{}}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.menu_btn}>
                <CustomText text={"Vehicle Details"} style={styles.title_btn} />
                <Entypo
                  name={"chevron-small-right"}
                  size={30}
                  color={"#fff"}
                  style={{}}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.menu_btn}>
                <CustomText
                  text={"Alert and reports"}
                  style={styles.title_btn}
                />
                <Entypo
                  name={"chevron-small-right"}
                  size={30}
                  color={"#fff"}
                  style={{}}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.menu_btn}>
                <CustomText text={"Gas stations"} style={styles.title_btn} />
                <Entypo
                  name={"chevron-small-right"}
                  size={30}
                  color={"#fff"}
                  style={{}}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.menu_btn}>
                <CustomText text={"Speedometer"} style={styles.title_btn} />
                <Entypo
                  name={"chevron-small-right"}
                  size={30}
                  color={"#fff"}
                  style={{}}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.menu_btn}>
                <CustomText text={"Audio player"} style={styles.title_btn} />
                <Entypo
                  name={"chevron-small-right"}
                  size={30}
                  color={"#fff"}
                  style={{}}
                />
              </TouchableOpacity>
            </View>
            <CustomText
              text={"Notifications"}
              style={{
                fontSize: 18,
                fontWeight: "bold",
                marginHorizontal: 20,
                marginTop: 10,
              }}
            />
            <View
              style={{
                backgroundColor: "#CFCFCF",
                marginHorizontal: 20,
                marginTop: 20,
                borderRadius: 10,
                bottom: 15,
              }}
            >
              <TouchableOpacity style={styles.menu_btn}>
                <CustomText text={"Notifications"} style={styles.title_btn} />
                <Entypo
                  name={"chevron-small-right"}
                  size={30}
                  color={"#fff"}
                  style={{}}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.menu_btn}>
                <CustomText text={"Planned drives"} style={styles.title_btn} />
                <Entypo
                  name={"chevron-small-right"}
                  size={30}
                  color={"#fff"}
                  style={{}}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.menu_btn}>
                <CustomText text={"Reminders"} style={styles.title_btn} />
                <Entypo
                  name={"chevron-small-right"}
                  size={30}
                  color={"#fff"}
                  style={{}}
                />
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </Modal>
      {/* select your distination  */}
      <Modal
        // animationIn="bounceInUp"
        // animationOut="bounceInDown"
        isVisible={isSelectDistinationVisible}
        style={styles.modal_Main_container}
      >
        <View
          style={{
            backgroundColor: "rgba(220, 220, 204, 10)",
            flex: 0.7,
            width: "100%",
            borderColor: "#1EF1F5",
            borderWidth: 1.2,
            marginTop: 20,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              marginTop: 20,
            }}
          >
            <GooglePlacesAutocomplete
              placeholder="PickUp Location here..."
              onPress={(data, details = null) => {
                handleStartLocationSelect(data, details);
                animateToRegion(details.geometry.location);
                // setStartLocation(data);
                // setRegion(chosenRegion);
                // mapRef.current.animateToRegion(chosenRegion, 1000);
              }}
              textInputProps={{
                placeholderTextColor: "#fff",
              }}
              fetchDetails={true}
              query={{
                key: "AIzaSyCxPKJMEW5ko5BoDLW5F3K4bzs-faQaHU8",
                language: "en",
              }}
              autoFillOnNotFound={true}
              styles={{
                container: {
                  // borderColor: "black",
                  // backgroundColor:'red'
                },
                textInputContainer: {
                  width: "90%",
                  alignSelf: "center",
                  height: 50,
                  borderColor: "black",
                  borderWidth: 1,
                  borderRadius: 10,
                },
                textInput: {
                  height: 48,
                  fontSize: 16,
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  color: "white",
                },
                predefinedPlacesDescription: {},
              }}
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              alignContent: "center",
              alignItems: "center",
            }}
          >
            <GooglePlacesAutocomplete
              placeholder="Drop Off Location here..."
              onPress={(data, details = null) => {
                // console.log("Selected Place Data:", data);
                let chosenRegion = {
                  longitude: details.geometry.location.lng,
                  latitude: details.geometry.location.lat,
                  latitudeDelta: 0.005,
                  longitudeDelta: 0.005,
                };

                handleEndLocationSelect(data, details);
                animateToRegion(details.geometry.location);
                // setRegion(chosenRegion);
                // setEndLocation(data);
                // mapRef.current.animateToRegion(chosenRegion, 1000);
              }}
              fetchDetails={true}
              query={{
                key: "AIzaSyCxPKJMEW5ko5BoDLW5F3K4bzs-faQaHU8",
                language: "en",
              }}
              textInputProps={{
                placeholderTextColor: "#fff",
              }}
              autoFillOnNotFound={true}
              styles={{
                container: {},
                textInputContainer: {
                  width: "90%",
                  alignSelf: "center",
                  height: 50,
                  borderColor: "black",
                  borderWidth: 1,
                  borderRadius: 10,
                  marginTop: 15,
                },
                textInput: {
                  height: 48,
                  fontSize: 16,
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  color: "white",
                },
                predefinedPlacesDescription: {
                  backgroundColor: "red",
                },
              }}
            />
          </View>
          <View style={{ flex: 1, justifyContent: "flex-end" }}>
            <CustomButton
              buttonText={"Submit"}
              style={styles.selectYourPickAndDrop}
              onPress={() => {
                toggleDistinationModal();
              }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Home;
