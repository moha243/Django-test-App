# Generated by Django 4.1.2 on 2022-11-29 11:04

import datetime
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('Tickets', '0004_alter_category_name'),
        ('Projects', '0015_task_is_active'),
    ]

    operations = [
        migrations.CreateModel(
            name='Notifications',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('icon', models.CharField(blank=True, max_length=100, null=True)),
                ('type', models.CharField(max_length=100)),
                ('message', models.CharField(max_length=1000000)),
                ('is_delete', models.BooleanField(default=False)),
                ('is_seen', models.BooleanField(default=False)),
                ('created_at', models.DateTimeField(default=datetime.datetime.today)),
                ('modified_at', models.DateTimeField(auto_now=True, null=True)),
                ('projectID', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.RESTRICT, to='Projects.project')),
                ('taskID', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.RESTRICT, to='Projects.task')),
                ('ticketID', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.RESTRICT, to='Tickets.tickets')),
                ('userID', models.ForeignKey(on_delete=django.db.models.deletion.RESTRICT, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'db_table': 'notifications',
                'ordering': ['-created_at', 'userID'],
            },
        ),
    ]
