import { Dimensions, FlatList, Image, StyleSheet, View } from "react-native";
import {
  AppSafeAreaView,
  AppText,
  BUTTON_BG,
  FOURTEEN,
  NORMAL,
  SEMI_BOLD,
  SIXTEEN,
  Toolbar,
} from "../../../common";
import { colors } from "../../../theme/colors";
import NavigationService from "../../../navigation/NavigationService";
import { ADDPRODUCT } from "../../../navigation/routes";
import Swiper from "react-native-swiper";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { useEffect, useState } from "react";
import {
  deleteProduct,
  getProductList,
} from "../../../slices/mrSlice/mrAction";
import { RefreshControl } from "react-native-gesture-handler";
import { IMAGE_PATH1 } from "../../../helper/Constants";
import TouchableOpacityView from "../../../common/TouchableOpacityView";
;
import { delete_icon, edit, noResult } from "../../../helper/ImageAssets";
import { universalPaddingHorizontal } from "../../../theme/dimens";
import { AnimationSpinner } from "../../../animation";
import LottieView from "lottie-react-native";
import DeleteConfirmationModal from "../../common/deleteConfirmationModal";

const { width } = Dimensions.get("window");

const Products = () => {
  const dispatch = useAppDispatch();

  const { productList, isLoading } = useAppSelector((state) => state?.mr);
  const [isVisible,setIsVisible] = useState(false);
  const [deleteId,setDeleteId]= useState();

  useEffect(() => {
    dispatch(getProductList());
  }, []);

  const handleDelete = () => {
    dispatch(deleteProduct(deleteId,setIsVisible(false)));
  };

  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.contentContainer}>
        <View style={styles.upperContainer}>
          <AppText weight={SEMI_BOLD} type={FOURTEEN}>{`Product Name: ${item?.name}`}</AppText>
          <View style={styles.editDeleteContainer}>
            <TouchableOpacityView
              tintColor={colors.buttonBg}
              onPress={() =>
                NavigationService.navigate(ADDPRODUCT, {
                  paramsData: item,
                  from: "edit",
                })
              }
            >
              <Image
                source={edit}
                style={styles.iconStyles}
                resizeMode="contain"
              />
            </TouchableOpacityView>
            <TouchableOpacityView
              tintColor={colors.buttonBg}
              onPress={() => {
                setDeleteId(item?.id)
                setIsVisible(true)
              }}
            >
              <Image
                source={delete_icon}
                style={styles.iconStyles}
                resizeMode="contain"
              />
            </TouchableOpacityView>
          </View>
        </View>

        <Swiper
          height={300}
          loop={false}
          showsPagination={true}
          dotColor="#ccc"
          activeDotColor={colors.buttonBg}
          dotStyle={styles.dotStyle}
          activeDotStyle={styles.activeStyle}
          paginationStyle={{
            bottom: -5,
          }}
        >
          {item?.images.map((image, imgIndex) => {
            return (
              <View key={imgIndex} style={styles.slide}>
                <Image
                  source={{ uri: IMAGE_PATH1 + image }}
                  style={styles.image}
                  resizeMode="stretch"
                  // resizeMethod="resize"
                />
              </View>
            );
          })}
        </Swiper>
        <View style={styles.descriptionContainer}>
          <AppText type={FOURTEEN}>{"Description:-"}</AppText>
          <AppText type={SIXTEEN} weight={SEMI_BOLD}>
            {item?.description}
          </AppText>
        </View>
      </View>
    );
  };

  return (
    <>
      {isLoading && <AnimationSpinner />}
      <AppSafeAreaView style={styles.mainContainer}>
        <Toolbar
          title="Product"
          isAddIcon
          handleAddIcon={() => {
            NavigationService.navigate(ADDPRODUCT);
          }}
        />
        <FlatList
          // refreshControl={
          //   // <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          // }
          showsVerticalScrollIndicator={false}
          data={productList}
          renderItem={renderItem}
          keyExtractor={(item) => item?.id}
          style={{ marginTop: 20 }}
          contentContainerStyle={{ paddingBottom: 50 }}
          ItemSeparatorComponent={() => (
            <View
              style={styles.itemSepratorStyle}
            />
          )}
          ListEmptyComponent={() => (
            <>
              <LottieView
                resizeMode="contain"
                style={styles.emptyContainerStyle}
                source={noResult}
                autoPlay
                loop
              />
              <AppText
                style={styles.emptyTextStyle}
                type={FOURTEEN}
                color={BUTTON_BG}
              >
                No Product
              </AppText>
            </>
          )}
        />
         <DeleteConfirmationModal
        visible={isVisible}
        onDelete={() => handleDelete()}
        confirmationText={"Are you sure?\nyou want to Delete this Product?"}
        onCancel={() => setIsVisible(false)}
        buttonTitle={"Delete"}
      />
      </AppSafeAreaView>
    </>
  );
};

export default Products;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: colors.mainBg,
    flex: 1,
  },
  contentContainer: {
    // marginTop: 20,
    // height: 350,
    paddingVertical: 20,
    paddingHorizontal: universalPaddingHorizontal,
  },
  upperContainer: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  editDeleteContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  swiper: {
    // height: 400,
    // width: "100%",
    flexGrow:1
  },
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  image: {
    width: width * 0.9,
    height: 250,
    borderRadius: 12,
  },
  descriptionContainer: {
    marginTop: 24,
    paddingHorizontal: 16,
    gap: 5,
  },
  dotStyle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 3,
  },
  activeStyle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginHorizontal: 3,
    backgroundColor: colors.buttonBg,
  },
  iconStyles:{ 
    width: 20, 
    height: 20 
  },
  itemSepratorStyle:{
    height: 1,
    backgroundColor: colors.bordeColor1,
    marginVertical: 10,
  },
  emptyContainerStyle:{ 
    height: 150, 
    width: 150, 
    alignSelf: "center" 
  },
  emptyTextStyle:{
    alignSelf: "center",
    marginBottom: 30,
    color: colors.bg_one_dark,
  }
  
});
