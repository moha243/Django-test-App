# Generated by Django 4.1.2 on 2022-11-24 08:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Projects', '0008_projectnote_noteid'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='projectnote',
            options={'ordering': ['-noteID']},
        ),
        migrations.AlterField(
            model_name='projectnote',
            name='note',
            field=models.CharField(max_length=1000000),
        ),
    ]
