# Generated by Django 4.1.2 on 2022-11-23 10:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Projects', '0005_remove_project_status_alter_task_end_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='projectfile',
            name='title',
            field=models.CharField(blank=True, max_length=500, null=True),
        ),
    ]
