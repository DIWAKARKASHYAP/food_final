import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet, Alert, ScrollView } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';

interface ProductInfo {
    name: string;
    brand: string;
    calories: string;
    protein: string;
    carbs: string;
    fat: string;
    fiber: string;
    sugar: string;
    salt: string;
    image: string | null;
}

interface CameraScreenProps {
    onClose: () => void;
}

type ScreenState = 'camera' | 'result';

export default function CameraScreen({ onClose }: CameraScreenProps) {
    const [permission, requestPermission] = useCameraPermissions();
    const [loading, setLoading] = useState(false);
    const [scanned, setScanned] = useState(false);
    const [screen, setScreen] = useState<ScreenState>('camera');
    const [scannedBarcode, setScannedBarcode] = useState('');
    const [productInfo, setProductInfo] = useState<ProductInfo | null>(null);
    const cameraRef = useRef(null);

    const fetchProductInfo = async (barcode: string) => {
        setLoading(true);
        setScanned(true);

        try {
            const response = await fetch(
                `https://world.openfoodfacts.org/api/v2/product/${barcode}.json`
            );
            const data = await response.json();

            if (data.status === 1 && data.product) {
                const product = data.product;
                const nutrients = product.nutriments || {};

                const productData: ProductInfo = {
                    name: product.product_name || 'Product Not Found',
                    brand: product.brands || 'N/A',
                    calories: Math.round(nutrients['energy-kcal'] || 0) + ' kcal',
                    protein: (nutrients.proteins || 0).toFixed(1) + 'g',
                    carbs: (nutrients.carbohydrates || 0).toFixed(1) + 'g',
                    fat: (nutrients.fat || 0).toFixed(1) + 'g',
                    fiber: (nutrients.fiber || 0).toFixed(1) + 'g',
                    sugar: (nutrients.sugars || 0).toFixed(1) + 'g',
                    salt: (nutrients.salt || 0).toFixed(1) + 'g',
                    image: product.image_url || null,
                };

                setScannedBarcode(barcode);
                setProductInfo(productData);
                setScreen('result');
            } else {
                Alert.alert('Not Found', 'Product not found in database. Try another barcode.');
                setScanned(false);
            }
        } catch (error) {
            Alert.alert('Error', 'Failed to fetch product info. Please try again.');
            setScanned(false);
        } finally {
            setLoading(false);
        }
    };

    const handleScanAnother = () => {
        setScreen('camera');
        setScanned(false);
        setScannedBarcode('');
        setProductInfo(null);
    };

    if (!permission) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#FF6B6B" />
            </View>
        );
    }

    if (!permission.granted) {
        return (
            <View style={styles.permissionContainer}>
                <Text style={styles.permissionIcon}>📷</Text>
                <Text style={styles.permissionTitle}>Camera Permission Required</Text>
                <Text style={styles.permissionText}>We need access to your camera to scan barcodes</Text>
                <TouchableOpacity style={styles.permissionButton} onPress={requestPermission}>
                    <Text style={styles.permissionButtonText}>Grant Permission</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
            </View>
        );
    }

    // CAMERA SCREEN
    if (screen === 'camera') {
        return (
            <View style={styles.cameraContainer}>
                <CameraView
                    ref={cameraRef}
                    style={styles.camera}
                    facing="back"
                    onBarcodeScanned={({ data }) => {
                        if (!scanned && !loading) {
                            fetchProductInfo(data);
                        }
                    }}
                />

                {/* Overlay with scan frame */}
                <View style={styles.cameraOverlay}>
                    <View style={styles.topDim} />
                    <View style={styles.middleContainer}>
                        <View style={styles.sideDim} />
                        <View style={styles.scanFrameContainer}>
                            <View style={[styles.corner, styles.topLeft]} />
                            <View style={[styles.corner, styles.topRight]} />
                            <View style={[styles.corner, styles.bottomLeft]} />
                            <View style={[styles.corner, styles.bottomRight]} />
                        </View>
                        <View style={styles.sideDim} />
                    </View>
                    <View style={styles.bottomDim}>
                        <Text style={styles.scanHint}>Point at barcode</Text>
                    </View>
                </View>

                {/* Loading Overlay */}
                {loading && (
                    <View style={styles.loadingOverlay}>
                        <ActivityIndicator size="large" color="#FF6B6B" />
                        <Text style={styles.loadingText}>Scanning barcode...</Text>
                    </View>
                )}

                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity style={styles.backButton} onPress={onClose}>
                        <Text style={styles.backButtonText}>← Back</Text>
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Scan Barcode</Text>
                    <View style={styles.backButton} />
                </View>

                {/* Footer */}
                <View style={styles.footer}>
                    <Text style={styles.footerText}>Align barcode in frame</Text>
                </View>
            </View>
        );
    }

    // RESULT SCREEN
    if (screen === 'result' && productInfo) {
        return (
            <View style={styles.resultContainer}>
                <ScrollView contentContainerStyle={styles.resultContent}>
                    {/* Header */}
                    <View style={styles.resultHeader}>
                        <TouchableOpacity style={styles.resultBackButton} onPress={onClose}>
                            <Text style={styles.resultBackButtonText}>← Close</Text>
                        </TouchableOpacity>
                        <Text style={styles.resultHeaderTitle}>Product Info</Text>
                        <View style={styles.resultBackButton} />
                    </View>

                    {/* Product Card */}
                    <View style={styles.productCard}>
                        <View style={styles.productHeader}>
                            <Text style={styles.productIcon}>🛒</Text>
                            <Text style={styles.productName}>{productInfo.name}</Text>
                        </View>

                        {/* Brand Info */}
                        <View style={styles.detailRow}>
                            <Text style={styles.detailLabel}>Brand:</Text>
                            <Text style={styles.detailValue}>{productInfo.brand}</Text>
                        </View>

                        {/* Main Nutrients */}
                        <View style={styles.nutritionGrid}>
                            <View style={styles.nutritionBox}>
                                <Text style={styles.nutritionNumber}>{productInfo.calories}</Text>
                                <Text style={styles.nutritionLabel}>Calories</Text>
                            </View>
                            <View style={styles.nutritionBox}>
                                <Text style={styles.nutritionNumber}>{productInfo.protein}</Text>
                                <Text style={styles.nutritionLabel}>Protein</Text>
                            </View>
                            <View style={styles.nutritionBox}>
                                <Text style={styles.nutritionNumber}>{productInfo.carbs}</Text>
                                <Text style={styles.nutritionLabel}>Carbs</Text>
                            </View>
                            <View style={styles.nutritionBox}>
                                <Text style={styles.nutritionNumber}>{productInfo.fat}</Text>
                                <Text style={styles.nutritionLabel}>Fat</Text>
                            </View>
                        </View>

                        {/* Secondary Nutrients */}
                        <View style={styles.nutritionGrid}>
                            <View style={styles.nutritionBox}>
                                <Text style={styles.nutritionNumber}>{productInfo.fiber}</Text>
                                <Text style={styles.nutritionLabel}>Fiber</Text>
                            </View>
                            <View style={styles.nutritionBox}>
                                <Text style={styles.nutritionNumber}>{productInfo.sugar}</Text>
                                <Text style={styles.nutritionLabel}>Sugar</Text>
                            </View>
                            <View style={styles.nutritionBox}>
                                <Text style={styles.nutritionNumber}>{productInfo.salt}</Text>
                                <Text style={styles.nutritionLabel}>Salt</Text>
                            </View>
                        </View>

                        {/* Barcode */}
                        <View style={styles.barcodeBox}>
                            <Text style={styles.barcodeLabel}>Barcode</Text>
                            <Text style={styles.barcodeValue}>{scannedBarcode}</Text>
                        </View>

                        {/* Action Buttons */}
                        <View style={styles.buttonGroup}>
                            <TouchableOpacity style={styles.primaryButton} onPress={handleScanAnother}>
                                <Text style={styles.primaryButtonText}>📷 Scan Another</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.secondaryButton} onPress={onClose}>
                                <Text style={styles.secondaryButtonText}>🏠 Go Home</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }

    return null;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0F0F0F',
        justifyContent: 'center',
        alignItems: 'center',
    },
    cameraContainer: {
        flex: 1,
        backgroundColor: '#000',
    },
    camera: {
        flex: 1,
    },
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 60,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingTop: 8,
        zIndex: 10,
    },
    headerTitle: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: '700',
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 8,
        backgroundColor: 'rgba(255, 107, 107, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    backButtonText: {
        color: '#FF6B6B',
        fontSize: 14,
        fontWeight: '600',
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 80,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 20,
    },
    footerText: {
        color: '#FF6B6B',
        fontSize: 14,
        fontWeight: '600',
    },
    cameraOverlay: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'space-between',
        alignItems: 'center',
        pointerEvents: 'none',
        zIndex: 5,
    },
    topDim: {
        flex: 1.5,
        width: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    middleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    sideDim: {
        flex: 1,
        height: 140,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    scanFrameContainer: {
        width: 280,
        height: 140,
        borderWidth: 2,
        borderColor: '#FF6B6B',
        borderRadius: 12,
        position: 'relative',
        backgroundColor: 'transparent',
    },
    corner: {
        position: 'absolute',
        width: 20,
        height: 20,
        borderColor: '#FF6B6B',
    },
    topLeft: {
        top: -2,
        left: -2,
        borderTopWidth: 3,
        borderLeftWidth: 3,
        borderTopLeftRadius: 8,
    },
    topRight: {
        top: -2,
        right: -2,
        borderTopWidth: 3,
        borderRightWidth: 3,
        borderTopRightRadius: 8,
    },
    bottomLeft: {
        bottom: -2,
        left: -2,
        borderBottomWidth: 3,
        borderLeftWidth: 3,
        borderBottomLeftRadius: 8,
    },
    bottomRight: {
        bottom: -2,
        right: -2,
        borderBottomWidth: 3,
        borderRightWidth: 3,
        borderBottomRightRadius: 8,
    },
    bottomDim: {
        flex: 1.5,
        width: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 20,
    },
    scanHint: {
        color: '#FF6B6B',
        fontSize: 13,
        fontWeight: '600',
    },
    loadingOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 20,
    },
    loadingText: {
        color: '#FFF',
        fontSize: 14,
        marginTop: 16,
        fontWeight: '600',
    },
    permissionContainer: {
        flex: 1,
        backgroundColor: '#0F0F0F',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
    },
    permissionIcon: {
        fontSize: 56,
        marginBottom: 16,
    },
    permissionTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: '#FFF',
        marginBottom: 8,
        textAlign: 'center',
    },
    permissionText: {
        fontSize: 14,
        color: '#999',
        textAlign: 'center',
        marginBottom: 32,
        lineHeight: 20,
    },
    permissionButton: {
        width: '100%',
        backgroundColor: '#FF6B6B',
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
        marginBottom: 12,
    },
    permissionButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '700',
    },
    cancelButton: {
        width: '100%',
        backgroundColor: '#1A1A1A',
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#333',
    },
    cancelButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '600',
    },

    // RESULT STYLES
    resultContainer: {
        flex: 1,
        backgroundColor: '#0F0F0F',
    },
    resultContent: {
        flexGrow: 1,
        paddingBottom: 20,
    },
    resultHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 16,
        paddingBottom: 20,
    },
    resultBackButton: {
        width: 44,
        height: 44,
        borderRadius: 12,
        backgroundColor: '#1A1A1A',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#333',
    },
    resultBackButtonText: {
        color: '#FF6B6B',
        fontSize: 14,
        fontWeight: '600',
    },
    resultHeaderTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#FFF',
    },
    productCard: {
        marginHorizontal: 20,
        backgroundColor: '#1A1A1A',
        borderRadius: 20,
        padding: 24,
        borderWidth: 1,
        borderColor: '#333',
    },
    productHeader: {
        alignItems: 'center',
        marginBottom: 28,
    },
    productIcon: {
        fontSize: 48,
        marginBottom: 12,
    },
    productName: {
        fontSize: 26,
        fontWeight: '700',
        color: '#FFF',
        textAlign: 'center',
    },
    detailRow: {
        flexDirection: 'row',
        marginBottom: 16,
        paddingBottom: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#333',
    },
    detailLabel: {
        fontSize: 14,
        color: '#999',
        fontWeight: '600',
        width: 80,
    },
    detailValue: {
        fontSize: 14,
        color: '#FFF',
        fontWeight: '500',
        flex: 1,
    },
    nutritionGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    nutritionBox: {
        width: '32%',
        backgroundColor: '#2A2A2A',
        borderRadius: 12,
        padding: 12,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#333',
        marginBottom: 12,
    },
    nutritionNumber: {
        fontSize: 16,
        fontWeight: '700',
        color: '#FF6B6B',
        marginBottom: 4,
    },
    nutritionLabel: {
        fontSize: 11,
        color: '#999',
        fontWeight: '600',
        textTransform: 'uppercase',
        textAlign: 'center',
    },
    barcodeBox: {
        backgroundColor: '#2A2A2A',
        borderRadius: 12,
        padding: 16,
        marginBottom: 20,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#333',
    },
    barcodeLabel: {
        fontSize: 12,
        color: '#999',
        fontWeight: '600',
        marginBottom: 6,
        textTransform: 'uppercase',
    },
    barcodeValue: {
        fontSize: 14,
        color: '#FFF',
        fontWeight: '700',
        fontFamily: 'monospace',
    },
    buttonGroup: {
        gap: 12,
    },
    primaryButton: {
        backgroundColor: '#FF6B6B',
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
    },
    primaryButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '700',
    },
    secondaryButton: {
        backgroundColor: '#2A2A2A',
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#333',
    },
    secondaryButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '600',
    },
});
