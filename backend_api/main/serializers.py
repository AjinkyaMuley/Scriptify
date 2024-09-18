from rest_framework import serializers
from . import models

class VendorSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Vendor
        fields = ['id','user','address']

    def __init__(self,*args,**kwargs):
        super(VendorSerializer,self).__init__(*args,**kwargs)
        # self.Meta.depth = 1

class VendorDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Vendor
        fields = ['id','user','address']

    def __init__(self,*args,**kwargs):
        super(VendorDetailSerializer,self).__init__(*args,**kwargs)
        # self.Meta.depth = 1

class ProductListSerializer(serializers.ModelSerializer):
    product_ratings = serializers.StringRelatedField(many=True,read_only=True)
    class Meta:
        model = models.Product
        fields = ['id','category','vendor','title','slug','tag_list','detail','price','product_ratings',
                  'image','product_file','downloads','usd_price']

    def __init__(self,*args,**kwargs):
        super(ProductListSerializer,self).__init__(*args,**kwargs)
        # self.Meta.depth = 1

class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ProductImage
        fields = ['id','product','image']

class ProductDetailSerializer(serializers.ModelSerializer):
    product_ratings = serializers.StringRelatedField(many=True,read_only=True)
    product_imgs = ProductImageSerializer(many=True,read_only=True)
    class Meta:
        model = models.Product
        fields = ['id','category','vendor','title','slug','tag_list','detail','price','product_ratings','product_imgs','demo_url','image','product_file','downloads','usd_price']

    def __init__(self,*args,**kwargs):
        super(ProductDetailSerializer,self).__init__(*args,**kwargs)
        # self.Meta.depth = 1
        

# Customer

class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Customer
        fields = ['id','user','mobile']

    def __init__(self,*args,**kwargs):
        super(CustomerSerializer,self).__init__(*args,**kwargs)
        self.Meta.depth = 1

class CustomerDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Customer
        fields = ['id','user','mobile']

    def __init__(self,*args,**kwargs):
        super(CustomerDetailSerializer,self).__init__(*args,**kwargs)
        self.Meta.depth = 1


#   Orders

class OrderSerializer(serializers.ModelSerializer):
    customer = serializers.PrimaryKeyRelatedField(queryset=models.Customer.objects.all())

    class Meta:
        model = models.Order
        fields = ['id', 'customer','order_status','total_amount','total_usd_amount']

    def __init__(self,*args,**kwargs):
        super(OrderSerializer,self).__init__(*args,**kwargs)
        self.Meta.depth = 1

class OrderItemSerializer(serializers.ModelSerializer):
    order = serializers.PrimaryKeyRelatedField(queryset=models.Order.objects.all(), write_only=True)
    product = serializers.PrimaryKeyRelatedField(queryset=models.Product.objects.all(), write_only=True)
    order_details = OrderSerializer(source='order', read_only=True)
    product_details = ProductDetailSerializer(source='product', read_only=True)

    class Meta:
        model = models.OrderItems
        fields = ['id', 'order', 'product', 'qty', 'price', 'usd_price','order_details', 'product_details']




class OrderDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.OrderItems
        fields = ['id','order','product']

    def __init__(self,*args,**kwargs):
        super(OrderDetailSerializer,self).__init__(*args,**kwargs)
        self.Meta.depth = 1

class CustomerAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.CustomerAddress
        fields = ['id','customer','address','default_address']

    def __init__(self,*args,**kwargs):
        super(CustomerAddressSerializer,self).__init__(*args,**kwargs)
        self.Meta.depth = 1

class ProductRatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ProductRating
        fields = ['id','customer','product','rating','reviews','add_time']

    def __init__(self,*args,**kwargs):
        super(ProductRatingSerializer,self).__init__(*args,**kwargs)
        self.Meta.depth = 1


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ProductCategory
        fields = ['id','title','detail']

    def __init__(self,*args,**kwargs):
        super(CategorySerializer,self).__init__(*args,**kwargs)
        # self.Meta.depth = 1

class CategoryDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ProductCategory
        fields = ['id','title','detail']

    def __init__(self,*args,**kwargs):
        super(CategoryDetailSerializer,self).__init__(*args,**kwargs)
        # self.Meta.depth = 1