# Generated by Django 4.1.2 on 2022-11-26 09:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Projects', '0014_taskcomments'),
    ]

    operations = [
        migrations.AddField(
            model_name='task',
            name='is_active',
            field=models.BooleanField(default=True),
        ),
    ]
