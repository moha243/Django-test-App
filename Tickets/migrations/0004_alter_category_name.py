# Generated by Django 4.1.2 on 2022-11-22 09:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Tickets', '0003_category_type_alter_assignticket_is_assigned'),
    ]

    operations = [
        migrations.AlterField(
            model_name='category',
            name='name',
            field=models.CharField(max_length=100),
        ),
    ]