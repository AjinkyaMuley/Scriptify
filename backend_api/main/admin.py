from django.contrib import admin
from . import models

# Register your models here.
admin.site.register(models.Vendor)
admin.site.register(models.ProductCategory)

class CustomerAdmin(admin.ModelAdmin):
    list_display = ['get_username','mobile']
    def get_username(self,obj):
        return obj.user.username
admin.site.register(models.Customer,CustomerAdmin)

# admin.site.register(models.Order)
admin.site.register(models.OrderItems)
admin.site.register(models.CustomerAddress)
admin.site.register(models.ProductRating)
admin.site.register(models.ProductImage)

# For inline product images
class ProductImagesInLine(admin.StackedInline):
    model = models.ProductImage

# Product admin configuration
class ProductAdmin(admin.ModelAdmin):  # Corrected from models.ModelAdmin to admin.ModelAdmin
    list_display = ['title','price','usd_price','downloads']
    list_editable = ['usd_price']
    prepopulated_fields = {'slug': ('title',)}
    inlines = [
        ProductImagesInLine,
    ]

# Register the Product model with the customized ProductAdmin
admin.site.register(models.Product, ProductAdmin)


# Product admin configuration
class OrderAdmin(admin.ModelAdmin):  # Corrected from models.ModelAdmin to admin.ModelAdmin
    list_display = ['id','customer','order_time','order_status']

# Register the Product model with the customized ProductAdmin
admin.site.register(models.Order, OrderAdmin)