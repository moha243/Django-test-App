# Generated by Django 4.1.2 on 2022-11-26 08:19

import datetime
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('Projects', '0013_alter_task_options_alter_tasknote_options_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='TaskComments',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('message', models.CharField(max_length=1000)),
                ('created_at', models.DateTimeField(default=datetime.datetime.today)),
                ('modified_at', models.DateTimeField(auto_now=True, null=True)),
                ('taskID', models.ForeignKey(on_delete=django.db.models.deletion.RESTRICT, to='Projects.task')),
                ('userID', models.ForeignKey(on_delete=django.db.models.deletion.RESTRICT, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'db_table': 'task_comments',
            },
        ),
    ]
